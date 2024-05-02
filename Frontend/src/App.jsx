import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/DashBoard.jsx';
import OrderList from './Pages/OrderList';
import OrderBilling from './Pages/OrderBilling';
import Login from './Pages/Login.jsx';
import OrderStatus from './Pages/OrderStatus.jsx';
import ManageProduct from './Pages/ManageProduct.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/orderstatus" element={<OrderStatus />} />
        <Route path="/billing" element={<OrderBilling />} />
        <Route path="/manageproduct" element={<ManageProduct />} />
      </Routes>
    </Router>
  );
}

export default App;