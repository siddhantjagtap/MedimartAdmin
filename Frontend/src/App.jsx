import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/DashBoard.jsx';
import OrderList from './Pages/OrderList';
import OrderStatus from './Pages/OrderStatus';
import OrderBilling from './Pages/OrderBilling';
import Login from './Pages/Login.jsx';
import ManageProducts from './Pages/ManageProducts.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/orderstatus" element={<OrderStatus />} />
        <Route path="/billing" element={<OrderBilling />} />
        <Route path="/manageproducts" element={<ManageProducts />} />
      </Routes>
    </Router>
  );

}

export default App;
