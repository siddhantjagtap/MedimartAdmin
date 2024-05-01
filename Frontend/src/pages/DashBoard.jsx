import React, { useState, useEffect } from 'react';
import { BsFillBellFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
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

const Dashboard = () => {
    const [orderData, setOrderData] = useState({
        totalOrders: 512,
        shippedProducts: 450,
        pendingOrders: 72,
    });

    const [chartData, setChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    useEffect(() => {
        const lineChartData = [
            { name: 'Jan', value: orderData.totalOrders - 200 },
            { name: 'Feb', value: orderData.totalOrders - 300 },
            { name: 'Mar', value: orderData.totalOrders - 100 },
            { name: 'Apr', value: orderData.totalOrders },
            { name: 'May', value: orderData.totalOrders - 200 },
            { name: 'Jun', value: orderData.totalOrders + 100 },
        ];

        const pieChartData = [
            { name: 'Shipped', value: orderData.shippedProducts },
            { name: 'Pending', value: orderData.pendingOrders },
            { name: 'Cancelled', value: orderData.totalOrders - orderData.shippedProducts - orderData.pendingOrders },
        ];

        const barChartData = [
            { name: 'Jan', value: orderData.totalOrders - 200 },
            { name: 'Feb', value: orderData.totalOrders - 300 },
            { name: 'Mar', value: orderData.totalOrders - 100 },
            { name: 'Apr', value: orderData.totalOrders },
            { name: 'May', value: orderData.totalOrders - 200 },
            { name: 'Jun', value: orderData.totalOrders + 100 },
        ];


        setChartData(lineChartData);
        setPieChartData(pieChartData);
        setBarChartData(barChartData);

    }, [orderData]);

    return (
        <>
            <div className="flex flex-col min-h-screen  md:block hidden">
                <header className="bg-gray-200 py-4 px-8 w-[100%] shadow flex justify-between">
                    <h1 className="text-2xl ml-[1rem] font-bold">NEXIBLES</h1>
                    <div className='flex'>
                    <BsFillBellFill className='items-center pt-2 mr-[1rem] text-4xl'/>
                    <CgProfile className='items-center pt-2 mr-[1rem] text-4xl'/>
                    </div>
                </header>
                <main className="flex-grow p-8">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-gradient-to-r from-orange-400 to-pink-600 text-white rounded-lg p-4 h-[14rem]">
                            <h2 className="text-3xl font-semibold">Total no. of Orders</h2>
                            <p className="text-5xl pt-[5rem] font-bold">{orderData.totalOrders}</p>
                        </div>
                        <div className="bg-gradient-to-l from-blue-600 to-yellow-200 text-white rounded-lg p-4">
                            <h2 className="text-3xl font-semibold">Products shipped</h2>
                            <p className="text-5xl pt-[5rem] font-bold">{orderData.shippedProducts}</p>
                        </div>
                        <div className="bg-gradient-to-l from-indigo-900 to-cyan-400 text-white rounded-lg p-4">
                            <h2 className="text-3xl font-semibold">Pending</h2>
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
                        <div className="">
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
            <div className="flex flex-col min-h-screen  md:hidden">
                <header className="bg-gray-100 py-4 px-8 shadow flex justify-between">
                    <h1 className="text-2xl font-bold">NEXIBLES</h1>
                    <div className='flex'>
                    <BsFillBellFill className='items-center  mr-[1rem] text-3xl'/>
                    <CgProfile className='items-center text-3xl'/>
                    </div>
                </header>
                <main className="flex-grow p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gradient-to-r from-orange-400 to-pink-600 text-white rounded-lg p-4">
                            <h2 className="text-lg font-semibold">Total no. of Orders</h2>
                            <p className="text-4xl font-bold">{orderData.totalOrders}</p>
                        </div>
                        <div className="bg-gradient-to-l from-blue-600 to-yellow-200 text-white rounded-lg p-4">
                            <h2 className="text-lg font-semibold">Products shipped</h2>
                            <p className="text-4xl font-bold">{orderData.shippedProducts}</p>
                        </div>
                        <div className="bg-gradient-to-l from-indigo-900 to-cyan-400 text-white rounded-lg p-4">
                            <h2 className="text-lg font-semibold">Pending</h2>
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
        </>

    );
};

export default Dashboard;