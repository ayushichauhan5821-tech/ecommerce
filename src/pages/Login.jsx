import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ✅ handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ validation
  const validate = () => {
    let newErrors = {};

    // LOGIN VALIDATION
    if (!showChangePassword) {
      if (!form.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Invalid email format";
      }

      if (!form.password) {
        newErrors.password = "Password is required";
      }
    }

    // CHANGE PASSWORD VALIDATION
    if (showChangePassword) {
      if (!form.currentPassword) {
        newErrors.currentPassword = "Current password is required";
      }

      if (!form.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (
        !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,}$/.test(
          form.newPassword
        )
      ) {
        newErrors.newPassword =
          "Min 6 chars, 1 uppercase, 1 number & 1 special char";
      }

      if (!form.confirmPassword) {
        newErrors.confirmPassword = "Confirm your password";
      } else if (form.newPassword !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (form.currentPassword === form.newPassword) {
        newErrors.newPassword =
          "New password must be different from current password";
      }
    }

    return newErrors;
  };

  // ✅ submit
  const SubmitForm = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }

    // 👉 CHANGE PASSWORD
    if (showChangePassword) {
      try {
        const token = localStorage.getItem("token");

        await axios.post(
          "http://localhost:3005/user/change-password",
          {
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("✅ Password updated successfully!");

        setForm({
          email: "",
          password: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

      } catch (err) {
        setMessage(
          err.response?.data?.message || "❌ Error updating password"
        );
      }

      return;
    }

    // 👉 LOGIN
    try {
      const response = await axios.post(
        "http://localhost:3005/user/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      localStorage.setItem("token", response.data.token || "dummy");
      navigate("/profile");

    } catch (e) {
      setMessage("❌ Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-semibold text-center mb-4">
          {showChangePassword ? "Change Password" : "Login"}
        </h2>

        {message && (
          <p className="text-center text-sm mb-3">{message}</p>
        )}

        <form onSubmit={SubmitForm} className="space-y-4">

          {/* LOGIN */}
          {!showChangePassword && (
            <>
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
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}

                <span
                  onClick={() => setShow(!show)}
                  className="text-sm cursor-pointer text-gray-500"
                >
                  {show ? "Hide" : "Show"}
                </span>
              </div>
            </>
          )}

          {/* CHANGE PASSWORD */}
          {showChangePassword && (
            <>
              <div>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.currentPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={form.newPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.newPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </>
          )}

          {/* TOGGLE */}
          <div className="flex justify-between text-sm">
            {!showChangePassword ? (
              <span
                onClick={() => {
                  setShowChangePassword(true);
                  setErrors({});
                  setMessage("");
                }}
                className="cursor-pointer text-indigo-600"
              >
                Forgot password?
              </span>
            ) : (
              <span
                onClick={() => setShowChangePassword(false)}
                className="cursor-pointer text-indigo-600"
              >
                ← Back to login
              </span>
            )}
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
            {showChangePassword ? "Update Password" : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;