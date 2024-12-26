import React, { useState } from "react";
import { Settings, LogOut, Key } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Retrieve username from localStorage
  const username = localStorage.getItem("username") || "Guest";

  const handleLogout = () => {
    // Clear the localStorage on logout
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    console.log("Logged out");
    // Optionally redirect to login page
    window.location.href = "/login"; // or use react-router's navigate
  };

  return (
    <nav className="bg-purple-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Hello</div>

        {/* Display username */}
        <div className="text-white text-lg">
          <span>hello :- {username}</span>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white hover:text-purple-200 transition-colors duration-200"
          >
            <Settings size={24} />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 w-full text-left"
                onClick={() => {
                  console.log("Reset Password");
                  setIsDropdownOpen(false);
                }}
              >
                <div className="flex items-center">
                  <Key size={18} className="mr-2" />
                  <Link to="/resetPassword">Reset Password</Link>
                </div>
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 w-full text-left"
                onClick={handleLogout}
              >
                <div className="flex items-center">
                  <LogOut size={18} className="mr-2" />
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
