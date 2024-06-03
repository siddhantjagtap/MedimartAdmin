import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdDelete } from "react-icons/md";
import SideMenu from '../Components/SideMenu';
import Navbar from '../Components/Navbar';
import debounce from 'lodash.debounce';
import Loading from "../Components/Loading";

function OrderMaster() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteOrderId, setDeleteOrderId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const pagesToShow = 5;

    const APIURL = import.meta.env.VITE_MEDIMART_URL;

    const fetchData = useCallback(
        debounce(async (searchTerm) => {
            setLoading(true);
            try {
                const response = await axios.get(`${APIURL}/orders`);
                const data = response.data.orders;
                const filteredData = data.filter((order) =>
                    order.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.cartItems.some(item =>
                        item.Name?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
                setOrders(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        fetchData(searchTerm);
    }, [searchTerm, fetchData]);

    const handleDeleteOrder = (orderId) => {
        setDeleteOrderId(orderId);
    };

    const confirmDeleteOrder = async () => {
        try {
            await axios.delete(`${APIURL}/deleteorder/${deleteOrderId}`, {
                headers: {
                    "API-Key": import.meta.env.VITE_API_Key,
                },
            });
            setOrders(orders.filter(order => order._id !== deleteOrderId));
        } catch (error) {
            console.error("Error deleting order:", error);
        } finally {
            setDeleteOrderId(null);
        }
    };

    const cancelDeleteOrder = () => {
        setDeleteOrderId(null);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentOrders = useMemo(() => {
        return orders.slice(indexOfFirstItem, indexOfLastItem);
    }, [orders, indexOfFirstItem, indexOfLastItem]);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(orders.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const startPage = Math.max(
        Math.min(
            currentPage - Math.floor(pagesToShow / 2),
            totalPages - pagesToShow + 1
        ),
        1
    );
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    return (
        <div className="flex">
            <SideMenu />
            <div className="flex-grow">
                <Navbar />
                <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search names..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-full w-[85%] focus:outline-none focus:ring-1 focus:ring-[#125872]"
                        />
                    </div>

                    <h2 className="text-xl font-bold mb-4 mt-[2rem]">Order Master</h2>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <Loading />
                        ) : (
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-3">No</th>
                                        <th className="px-4 py-3">Order Date</th>
                                        <th className="px-4 py-3">Full Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Ordered Items</th>
                                        {/* <th className="px-4 py-3">Contact No</th> */}
                                        <th className="px-4 py-3">Amount</th>
                                        <th className="px-4 py-3">Payment Status</th>
                                        {/* <th className="px-4 py-3">Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map((order, index) => (
                                        <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                            <td className="px-2 py-3">{indexOfFirstItem + index + 1}</td>
                                            <td className="px-2 pl-12 py-3">{order.orderDate}</td>
                                            <td className="px-2 pl-12 py-3">{order.fullName}</td>
                                            <td className="px-2 pl-12 py-3">{order.email}</td>
                                            <td className="px-2 py-3">
                                                {order.cartItems.map((item) => (
                                                    <div key={item._id} className="mb-2">
                                                        <img src={item.Image_URL} alt={item.Name} className="w-16 h-16 object-cover" />
                                                        <p>{item.Name}</p>
                                                        <p>Quantity: {item.quantity}</p>
                                                        <p>Item Price: {item.Price}</p>

                                                    </div>
                                                ))}
                                            </td>
                                            {/* <td className="px-4 pl-12 py-3">{order.contactNo}</td> */}
                                            <td className="px-4 pl-12 py-3">{order.amount}</td>
                                            <td className="px-4 pl-12 py-3">{order.paymentStatus}</td>
                                            {/* <td className="px-4 py-3 mt-[1.2rem] flex items-center justify-center gap-2">
                                                <button
                                                    className="px-2 py-1 rounded-md"
                                                    onClick={() => handleDeleteOrder(order._id)}
                                                >
                                                    <MdDelete className="text-red-500 hover:text-red-700 text-xl" />
                                                </button>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button onClick={prevPage} className="mx-1 px-3 py-2 cursor-pointer">
                            <IoIosArrowBack />
                        </button>
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                            <button
                                key={i}
                                className={`mx-1 px-4 py-2 cursor-pointer ${currentPage === startPage + i ? 'border border-black rounded-full' : ''
                                    }`}
                                onClick={() => paginate(startPage + i)}
                            >
                                {startPage + i}
                            </button>
                        ))}
                        <button onClick={nextPage} className="mx-1 px-3 py-2 cursor-pointer">
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            </div>
            {deleteOrderId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p>Are you sure you want to delete this order?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                                onClick={confirmDeleteOrder}
                            >
                                Delete
                            </button>
                            <button className="px-4 py-2 bg-gray-300 rounded" onClick={cancelDeleteOrder}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderMaster;
