import React, { useState, useEffect } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/nexible.gif";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.result.name);
      console.log(decodedToken.result.name) // Extract the name from the decoded token
    }
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <header className="bg-gray-200 py-4 px-8 shadow flex justify-between">
        <img className="h-[2rem] w-[12rem]" src={logo} alt="Nexible Logo" />
        <div className="flex items-center">
          {/* <BsFillBellFill className="pt-2 mr-[1rem] text-4xl" /> */}
          {isLoggedIn ? (
            <div className="relative">
              <CgProfile
                className="pt-2 mr-[1rem] text-4xl"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <div className="px-4 py-2">
                    <span className="block text-sm font-semibold">{username}</span>
                    <button
                      onClick={handleLogout}
                      className="block text-sm font-semibold mt-3"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-black text-white px-4 py-2 rounded-full">
                Login
              </button>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
