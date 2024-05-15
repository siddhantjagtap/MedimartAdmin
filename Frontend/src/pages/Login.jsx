import React, { useState } from 'react';
import axios from 'axios';
import logo from "../assets/nexible.gif";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [userpassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://nexiblesapp.barecms.com/api/login', {
        email,
        userpassword,
        role: 'admin',
      });

      if (response.data.status === "success") {
        console.log("Login Success");
        const { token, data } = response.data;
        localStorage.setItem('token', token);
        navigate('/');
        toast.success('Login Successful!');
      } else {
        setError('Login failed',error);
        toast.error('Login failed: ');
      }
    } catch (error) {
      console.error('Login Error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      toast.error('Login failed: ' + errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg w-[24rem] h-[24rem] shadow-md p-8">
        <div className="flex items-center justify-center mb-6">
          <img className="h-[2rem] w-[12rem]" src={logo} alt="Logo" />
        </div>
        <p className="text-gray-700 font-semibold mb-4">Email</p>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-gray-700 font-semibold mb-4">Password</p>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={userpassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button onClick={handleLogin} className="w-full py-2 bg-black text-white rounded-full">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
