import React from 'react';
import logo from "../assets/nexible.gif";
import {Link} from 'react-router-dom';
const Login = () => {
  return (
  
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg w-[24rem] h-[24rem] shadow-md p-8">
        <div className="flex items-center justify-center mb-6">
        <img className="h-[2rem] w-[12rem]" src={logo}></img>
        </div>
        {/* <div className="text-gray-700 font-semibold mb-4">Admin Login</div> */}
        <p className="text-gray-700 font-semibold mb-4">Username</p>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-gray-700 font-semibold mb-4">Password</p>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Link to="/">
        <button className="w-full py-2 bg-black text-white rounded-full ">
          Login
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;