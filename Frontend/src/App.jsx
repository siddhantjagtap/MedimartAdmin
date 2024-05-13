import React ,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/DashBoard.jsx';
import OrderList from './Pages/OrderList';
import OrderBilling from './Pages/OrderBilling';
import Login from './Pages/Login.jsx';
import ManageProducts from './Pages/ManageProducts.jsx'
import OrderStatus from './Pages/OrderStatus.jsx'

function App() {
  const [totalOrders, setTotalOrders] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashBoard totalOrders={totalOrders}/>} />
        <Route path="/orderlist" element={<OrderList totalOrders={totalOrders} setTotalOrders={setTotalOrders} />} />
        <Route path="/orderstatus" element={<OrderStatus />} />
        <Route path="/billing" element={<OrderBilling />} />
        <Route path="/manageproducts" element={<ManageProducts />} />
      </Routes>
    </Router>
  );

}

export default App;