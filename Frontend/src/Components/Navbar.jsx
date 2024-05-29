import React, { useState, useEffect } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.username) { 
          setIsLoggedIn(true);
          setUsername(decodedToken.username);
        } else {
          console.warn("Invalid token format or missing name property");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <header className="bg-white py-4 px-8  flex justify-between">
      <div className="flex items-center justify-center ">
          <img className="h-[3rem] w-[3rem]" src={logo} alt="Logo" />
          <Link to="/" className="md:block hidden text-xl md:text-3xl font-bold ml-1 font-PlayFair">
            <span className="text-[#14496b]">Medi</span>
            <span className="text-[#8ccf28]">Mart</span>
          </Link>
        </div>
        <div className="flex items-center">
          {/* <BsFillBellFill className="pt-2 mr-[1rem] text-4xl" /> */}
          {isLoggedIn ? (
            <div className="relative">
              <CgProfile
                className="pt-2 mr-[1rem] text-[2.7rem]"
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
              <button className="bg-[#125872] text-white px-4 py-2 rounded-full">
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
