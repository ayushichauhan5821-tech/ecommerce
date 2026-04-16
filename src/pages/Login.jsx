import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 

const Login = () => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]); 

  const navigate = useNavigate();

  const SubmitForm = async (e) => {
    e.preventDefault(); 

    console.log("Form Submitted !!");

    const userData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:3005/user/login", 
        userData
      );

      console.log("Response:", response.data);

      if (response.status === 200) {
       
        localStorage.setItem("token", response.data.token || "dummy");

        navigate("/profile");
      }

      setEmail("");
      setPassword("");
      setError([]);

    } catch (e) {
      console.log(e);

      const errors = e.response?.data?.errors || [
        { msg: "Invalid email or password" },
      ];

      setError(errors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-center mt-1 mb-6">
          Sign in to your account
        </p>

        {/* ✅ FORM */}
        <form className="space-y-5" onSubmit={SubmitForm}>

         
          {error.length > 0 && (
            <div className="bg-red-100 rounded-xl p-2 w-full">
              {error.map((value, index) => (
                <p key={index} className="text-red-500">
                  {value.msg}
                </p>
              ))}
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 cursor-pointer text-sm text-gray-500"
              >
                {show ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Remember
            </label>
            <span className="hover:text-indigo-500 cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
            Sign In
          </button>

        </form>

     
        <p className="text-center text-sm text-gray-500 mt-6">
          New here?{" "}
          <Link
            to="/joinus"
            className="text-indigo-600 cursor-pointer hover:underline font-medium"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;