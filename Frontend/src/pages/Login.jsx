import React, { useState } from 'react';
import logo from "../assets/logo.jpg";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminEmail = import.meta.env.VITE_LOGIN_EMAIL;
    const adminPassword = import.meta.env.VITE_LOGIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      console.log("Login Success");
      localStorage.setItem('admin-token', 'admin-token'); // You can set any token value as per your requirement
      navigate('/');
      toast.success('Login Successful!');
    } else {
      setError('Login failed: Invalid email or password');
      toast.error('Login failed: Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg w-[24rem] h-[25rem] shadow-md p-8">
        <div className="flex items-center justify-center mb-6">
          <img className="h-[3rem] w-[3rem]" src={logo} alt="Logo" />
          <Link to="/" className="md:block hidden text-xl md:text-3xl font-bold ml-1 font-PlayFair">
            <span className="text-[#14496b]">Medi</span>
            <span className="text-[#8ccf28]">Mart</span>
          </Link>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 mb-1">{error}</p>}
        <button onClick={handleLogin} className="w-full py-2 bg-[#125872] text-white rounded-full">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
