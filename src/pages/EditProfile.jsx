import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3005/user/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setFormData({
          username: res.data.user.username,
          email: res.data.user.email,
        });
      } catch (err) {
        console.log(err.response || err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  UPDATE PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:3005/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Profile Updated ✅");
      navigate("/profile");
    } catch (err) {
      console.log(err.response || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl animate-fadeIn">

        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="w-full bg-gray-300 py-2.5 rounded-xl"
          >
            Cancel
          </button>

        </form>
      </div>

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default EditProfile;