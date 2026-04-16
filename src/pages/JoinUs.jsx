import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JoinUs = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);

  // ✅ VALIDATION
  const validate = (name, value) => {
    let message = "";

    if (name === "username") {
      if (!value) message = "Username is required";
      else if (value.length < 4)
        message = "Username must be at least 4 characters";
    }

    if (name === "email") {
      if (!value) message = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value))
        message = "Enter valid email";
    }

    if (name === "password") {
      if (!value) message = "Password is required";
      else if (value.length < 6)
        message = "Password must be at least 6 characters";
    }

    return message;
  };

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    setErrors({
      ...errors,
      [name]: validate(name, value),
    });
  };

  // ✅ SUBMIT
  const submitForm = async (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(form).forEach((key) => {
      const error = validate(key, form[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3005/user/register",
        form
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);

        // clear form
        setForm({ username: "", email: "", password: "" });
        setErrors({});
        setBackendError([]);
      }
    } catch (err) {
      const errors = err.response?.data?.errors || [
        { msg: "User Already Exist🚫" },
      ];
      setBackendError(errors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Join us today 🚀
        </p>

        <form className="space-y-4" onSubmit={submitForm}>

          {/* GLOBAL ERROR */}
          {backendError.length > 0 && (
            <div className="bg-red-100 p-2 rounded-xl">
              {backendError.map((err, i) => (
                <p key={i} className="text-red-500 text-sm">
                  {err.msg}
                </p>
              ))}
            </div>
          )}

          {/* USERNAME */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.email ? "border-red-500" : ""
              }`}
            />

            {/* 🔥 EXISTING EMAIL ERROR */}
            {backendError.find((e) =>
              e.msg.includes("already exists")
            ) && (
              <p className="text-red-500 text-sm mt-1">
                Email already registered
              </p>
            )}

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default JoinUs;