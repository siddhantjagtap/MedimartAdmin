
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideMenu from './Components/SideMenu';
import DashBoard from './Pages/DashBoard';
import OrderList from './Pages/OrderList';
import OrderStatus from './Pages/OrderStatus';
import OrderBilling from './Pages/OrderBilling';
import Navbar from './Components/Navbar';


function App() {
    return (
        <Router>
            <div className="">
                <SideMenu />
                <div className="flex-grow">
                    <Navbar/>
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
