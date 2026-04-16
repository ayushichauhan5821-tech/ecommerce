import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  // ✅ FETCH PROFILE
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/user/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setData(response.data.user);
      } catch (error) {
        console.log(error.response || error.message);
      }
    };

    FetchData();
  }, []);

  // ✅ LOGOUT
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3005/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error.response || error.message);
    }

    localStorage.removeItem("token");
    setData(null);
    navigate("/login");
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 animate-pulse text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4 animate-fadeIn">
      
      {/* CARD */}
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-100 shadow-md transition duration-500 hover:scale-110 hover:rotate-3"
          />

          <h2 className="text-2xl font-bold mt-4 text-gray-800 transition-all duration-300">
            {data.username?.charAt(0).toUpperCase() + data.username?.slice(1)}
          </h2>

          
        </div>

        <div className="border-t my-6"></div>

        {/* INFO */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between hover:text-indigo-500 transition">
            <span className="font-medium text-gray-500">Email</span>
            <span>{data.email}</span>
          </div>

          
        </div>

        {/* BUTTONS */}
        <div className="mt-8 space-y-3">

          <button
            onClick={() => navigate("/edit-profile")}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-full bg-gray-300 text-gray-800 py-2.5 rounded-xl transition-all duration-300 hover:bg-gray-400 hover:scale-105 active:scale-95"
          >
            Account Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2.5 rounded-xl transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Logout
          </button>

        </div>
      </div>

      {/* CUSTOM ANIMATION */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Profile;