import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from './pages/DashBoard';
import OrderList from './pages/OrderList';
import Login from './pages/Login';
import ManageProducts from './pages/ManageProducts';
import Users from './pages/Users';
import SideMenu from './Components/SideMenu'; // Make sure to import SideMenu if it's not already included in the other components
import OrderMaster from './pages/OrderMaster';
import Banner from './pages/Banner';

function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="flex">
        {/* <SideMenu /> */}
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<DashBoard />} />
            <Route path="/orderlist" element={<OrderList />} />
            <Route path="/manageproducts" element={<ManageProducts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/ordermaster" element={<OrderMaster />} />
            <Route path="/banner" element={<Banner />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
