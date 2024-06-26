import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideMenu from '../Components/SideMenu';
import Navbar from '../Components/Navbar';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    BarChart,
    Bar,
    Pie,
    PieChart,
    Cell,
    ResponsiveContainer,
} from 'recharts';

const COLORS = ['#E53E3E', '#38B2AC', '#7F9CF5'];
const APIURL = import.meta.env.VITE_MEDIMART_URL;
const DashBoard = () => {
    const [orderData, setOrderData] = useState({
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
    });

    const [chartData, setChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    useEffect(() => {
        axios
            .get(`${APIURL}/orders`)
            .then((response) => {
                //console.log('API Response:', response.data); // Log API response for debugging
                const orders = response.data.orders; // Assuming orders are under a key called 'orders'
                const totalOrders = orders.length;
                const completedOrders = orders.filter(
                    (order) => order.paymentStatus === 'Completed'
                ).length;
                const pendingOrders = orders.filter(
                    (order) => order.paymentStatus !== 'Completed'
                ).length;

                setOrderData({
                    totalOrders,
                    completedOrders,
                    pendingOrders,
                });

                const lineChartData = [
                    { name: 'Jan', value: totalOrders - 200 },
                    { name: 'Feb', value: totalOrders - 300 },
                    { name: 'Mar', value: totalOrders - 100 },
                    { name: 'Apr', value: totalOrders },
                    { name: 'May', value: totalOrders - 200 },
                    { name: 'Jun', value: totalOrders + 100 },
                ];

                const pieChartData = [
                    { name: 'Completed', value: completedOrders },
                    { name: 'Pending', value: pendingOrders },
                    { name: 'Cancelled', value: totalOrders - completedOrders - pendingOrders },
                ];

                const barChartData = [
                    { name: 'Jan', value: totalOrders - 200 },
                    { name: 'Feb', value: totalOrders - 300 },
                    { name: 'Mar', value: totalOrders - 100 },
                    { name: 'Apr', value: totalOrders },
                    { name: 'May', value: totalOrders - 200 },
                    { name: 'Jun', value: totalOrders + 100 },
                ];

                setChartData(lineChartData);
                setPieChartData(pieChartData);
                setBarChartData(barChartData);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    return (
        <>
            <div className="flex">
                <SideMenu />
                <div className="flex-grow">
                    <Navbar />
                    <div className="flex flex-col min-h-screen md:block hidden">
                        <main className="flex-grow p-8">
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-[#14496b] text-white rounded-lg p-4 h-[14rem]">
                                    <h2 className="text-2xl font-semibold">Total no. of Orders</h2>
                                    <p className="text-5xl pt-[5rem] font-bold">{orderData.totalOrders}</p>
                                </div>
                                <div className="bg-[#0D9276] text-white rounded-lg p-4">
                                    <h2 className="text-2xl font-semibold">Payment Completed</h2>
                                    <p className="text-5xl pt-[5rem] font-bold">{orderData.completedOrders}</p>
                                </div>
                                <div className="bg-[#8ccf28] text-white rounded-lg p-4">
                                    <h2 className="text-2xl font-semibold">Payment Pending</h2>
                                    <p className="text-5xl pt-[5rem] font-bold">{orderData.pendingOrders}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg p-4 border-2">
                                    <LineChart width={400} height={300} data={chartData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                    </LineChart>
                                </div>
                                <div className="bg-white rounded-lg p-4 border-2">
                                    <AreaChart width={400} height={300} data={chartData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </div>
                                <div className="bg-white rounded-lg p-4 border-2">
                                    <PieChart width={400} height={300}>
                                        <Pie
                                            data={pieChartData}
                                            cx={200}
                                            cy={150}
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </div>
                                <div>
                                    <div className="bg-white rounded-lg p-4 border-2">
                                        <BarChart width={400} height={300} data={barChartData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="value" fill="#8884d8" />
                                        </BarChart>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    {/* Mobile view  */}
                    <div className="flex flex-col min-h-screen md:hidden">
                        <main className="flex-grow p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gradient-to-r from-orange-400 to-pink-600 text-white rounded-lg p-4">
                                    <h2 className="text-lg font-semibold">Total no. of Orders</h2>
                                    <p className="text-4xl font-bold">{orderData.totalOrders}</p>
                                </div>
                                <div className="bg-gradient-to-l from-blue-600 to-yellow-200 text-white rounded-lg p-4">
                                    <h2 className="text-lg font-semibold">Products Completed</h2>
                                    <p className="text-4xl font-bold">{orderData.completedOrders}</p>
                                </div>
                                <div className="bg-gradient-to-l from-indigo-900 to-cyan-400 text-white rounded-lg p-4">
                                    <h2 className="text-lg font-semibold">Pending Orders</h2>
                                    <p className="text-4xl font-bold">{orderData.pendingOrders}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white rounded-lg p-4 ">
                                    <ResponsiveContainer width="100%" height={240}>
                                        <LineChart data={chartData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white rounded-lg p-4 ">
                                    <ResponsiveContainer width="100%" height={240}>
                                        <AreaChart data={chartData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend />
                                            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white rounded-lg p-4 ">
                                    <ResponsiveContainer width="100%" height={240}>
                                        <PieChart>
                                            <Pie
                                                data={pieChartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {pieChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white rounded-lg p-4 ">
                                    <ResponsiveContainer width="100%" height={240}>
                                        <BarChart data={barChartData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="value" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashBoard;
