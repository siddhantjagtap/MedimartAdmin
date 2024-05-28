import React ,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/DashBoard.jsx';
import OrderList from './Pages/OrderList';
import Login from './Pages/Login.jsx';
import ManageProducts from './Pages/ManageProducts.jsx'
import Users from './Pages/Users.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashBoard />}/>
        <Route path="/orderlist" element={<OrderList />}/>
        <Route path="/manageproducts" element={<ManageProducts />} /> 
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
