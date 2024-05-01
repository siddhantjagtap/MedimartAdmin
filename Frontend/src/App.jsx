// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SideMenu from './Components/SideMenu';
import DashBoard from './pages/DashBoard';
import OrderList from './pages/OrderList';
import OrderStatus from './pages/OrderStatus';
import OrderBilling from './pages/OrderBilling';

function App() {
    return (
        <Router>
            <div className="flex">
                <SideMenu />
                <div className="">
                    <Routes>
                        <Route path="/dashboard" element={<DashBoard />} />
                        <Route path="/orderlist" element={<OrderList />} />
                        <Route path="/orderstatus" element={<OrderStatus />} />
                        <Route path="/billing" element={<OrderBilling />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
