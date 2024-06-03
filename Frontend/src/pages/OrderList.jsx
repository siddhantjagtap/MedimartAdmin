import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import SideMenu from '../Components/SideMenu';
import Navbar from '../Components/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loading from "../Components/Loading";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pagesToShow = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const APIURL = import.meta.env.VITE_MEDIMART_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${APIURL}/orders`);
        if (response.data) {
          setOrders(response.data.orders);
          setFilteredOrders(response.data.orders);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      const updatedOrders = orders.filter((order) => order._id !== deleteOrderId);
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setDeleteOrderId(null);
    }
  };

  const cancelDeleteOrder = () => {
    setDeleteOrderId(null);
  };

  const handleSearch = () => {
    const filtered = orders.filter((order) => {
      const orderDate = parseDate(order.orderDate);
      if (!orderDate) {
        return false;
      }

      const startDateValid = !startDate || orderDate >= startDate;
      const endDateValid = !endDate || orderDate <= endDate;
      return startDateValid && endDateValid;
    });
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const parseDate = (dateString) => {
    if (!dateString) {
      return null;
    }

    const [day, month, year] = dateString.split('/');
    const parsedDate = new Date(`${year}-${month}-${day}`);

    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date string:', dateString);
      return null;
    }

    return parsedDate;
  };

  const currentOrders = filteredOrders.filter((order) => {
    const orderDate = parseDate(order.orderDate);
    if (!orderDate) {
      return false; // Exclude orders with invalid date strings
    }

    const startDateValid = !startDate || orderDate >= startDate;
    const endDateValid = !endDate || orderDate <= endDate;
    return startDateValid && endDateValid;
  });

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredOrders.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
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
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-white rounded-full border border-solid border-gray-400 p-2 mr-4">
              <label className="mr-2 font-medium text-black">Start date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full outline-none"
                placeholderText="Select a start date"
              />
            </div>
            <div className="flex items-center bg-white rounded-full border border-solid border-gray-400 p-2 mr-4">
              <label className="mr-2 font-medium text-black">End date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="w-full outline-none"
                placeholderText="Select an end date"
              />
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 px-8 py-2 bg-[#125872] text-white rounded-full"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4 mt-[2rem]">Order List</h2>
          <div className="overflow-x-auto">
            {loading ? (
              <Loading />
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-3">No</th>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Order Date</th>
                    <th className="px-4 py-3">Full Name</th>
                    <th className="px-4 py-3">Address</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">State</th>
                    <th className="px-4 py-3">Pincode</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Contact No</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Payment Status</th>
                    <th className="px-4 py-3">Razorpay Order ID</th>
                    <th className="px-4 py-3">Razorpay Payment ID</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      <td className="px-4 py-3">{indexOfFirstItem + index + 1}</td>
                      <td className="px-8 py-3">{order._id}</td>
                      <td className="px-4 pl-12 py-3">{order.orderDate}</td>
                      <td className="px-4 pl-12 py-3">{order.fullName}</td>
                      <td className="px-4 pl-12 py-3">{order.address}</td>
                      <td className="px-4 pl-12 py-3">{order.city}</td>
                      <td className="px-4 pl-12 py-3">{order.state}</td>
                      <td className="px-4 pl-12 py-3">{order.pincode}</td>
                      <td className="px-4 pl-12 py-3">{order.email}</td>
                      <td className="px-4 pl-12 py-3">{order.contactNo}</td>
                      <td className="px-4 pl-12 py-3">{order.amount}</td>
                      <td className="px-4 pl-12 py-3">{order.paymentStatus}</td>
                      {/* <td className="px-4 pl-12 py-3">
      {order.cartItems.map((item) => (
        <div key={item._id}>
          <p>{item.Name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.Price}</p>
        </div>
      ))}
    </td> */}
                      <td className="px-4 pl-12 py-3">{order.razorpay_order_id}</td>
                      <td className="px-4 pl-12 py-3">{order.razorpay_payment_id}</td>
                      <td className="px-4 py-3 mt-[1.2rem] flex items-center justify-center gap-2">
                        <button
                          className="px-2 py-1 rounded-md"
                          onClick={() => handleDeleteOrder(order._id)}
                        >
                          <MdDelete className="text-red-500 hover:text-red-700 text-xl" />
                        </button>
                      </td>
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
                className={`mx-1 px-4 py-2 cursor-pointer ${currentPage === startPage + i ? 'border border-black rounded-full' : ''}`}
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

export default OrderList;