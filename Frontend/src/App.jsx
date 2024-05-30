import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from './Pages/DashBoard.jsx';
import OrderList from './Pages/OrderList.jsx';
import Login from './Pages/Login.jsx';
import ManageProducts from './Pages/ManageProducts.jsx';
import Users from './Pages/Users.jsx';
import SideMenu from './Components/SideMenu'; // Make sure to import SideMenu if it's not already included in the other components

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
