import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPrint } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SideMenu from '../Components/SideMenu';
import Navbar from '../Components/Navbar';

function OrderList({ totalOrders, setTotalOrders }) {
  const [orders, setOrders] = useState([]);
  const apiUrl = import.meta.env.VITE_NEXIBLE_URL;
  const apikey = import.meta.env.VITE_API_Key;
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pagesToShow = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/ordermaster`, {
          headers: {
            'API-Key': apikey,
          },
        });
        if (response.data.status === 'success') {
          setOrders(response.data.data || []);
          setFilteredOrders(response.data.data || []);
          setTotalOrders(response.data.data.length);
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl, apikey, setTotalOrders]);

  const handleDeleteOrder = (orderId) => {
    setDeleteOrderId(orderId);
  };

  const confirmDeleteOrder = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/ordermaster/${deleteOrderId}`, {
        headers: {
          'API-Key': apikey,
        },
      });
      if (response.data.status === 'success') {
        console.log('Order deleted successfully');
        const updatedOrders = orders.filter(order => order.id !== deleteOrderId);
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        setTotalOrders(updatedOrders.length);
      } else {
        console.error('Error deleting order:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    } finally {
      setDeleteOrderId(null);
    }
  };

  const cancelDeleteOrder = () => {
    setDeleteOrderId(null);
  };

  const handleSearch = () => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      const startDateValid = !startDate || orderDate >= new Date(startDate);
      const endDateValid = !endDate || orderDate <= new Date(endDate + "T23:59:59");
      return startDateValid && endDateValid;
    });
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

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
          <div className="relative w-[77.75rem] h-[3.5625rem] mt-[1.5rem]">
            <div className="absolute w-[20rem] h-[3.5625rem] top-0 left-0">
              <div className="w-[17rem] relative h-[3.5625rem] bg-white rounded-[2.8125rem] border border-solid border-[#a8a8a8]">
                <div className="absolute w-[4.5625rem] top-[0.375rem] left-[1.375rem] font-medium text-black text-[0.875rem] tracking-[0] leading-[normal]">
                  Start date
                </div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="absolute w-[14.9375rem] top-[1.6875rem] left-[1.375rem] font-medium text-[#777777] text-1rem tracking-[0] leading-[normal]"
                />
              </div>
            </div>

            <div className="absolute w-[20rem] h-[3.5625rem] top-0 left-[20.4375rem]">
              <div className="w-[17rem] relative h-[3.5625rem] bg-white rounded-[2.8125rem] border border-solid border-[#a8a8a8]">
                <div className="absolute w-[14.5625rem] top-[0.375rem] left-[1.3125rem] font-medium text-black text-[0.875rem] tracking-[0] leading-[normal]">
                  End date
                </div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="absolute w-[14.9375rem] top-[1.6875rem] left-[1.375rem] font-medium text-[#777777] text-1rem tracking-[0] leading-[normal]" />
              </div>
            </div>
            <button
              className="inline-flex items-center justify-center gap-[0.625rem] px-[8rem] py-[1rem] absolute top-0 left-[41.4375rem] w-[18rem] h-[3.5625rem] bg-black rounded-[2.8125rem] overflow-hidden border border-solid border-[#a8a8a8]  relative w-fit mt-[-0.0625rem] font-medium text-[#ffffff] text-[1rem] tracking-[0] leading-[normal]"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4 mt-[2rem]">Order List</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-3"> ID</th>
                  <th className="px-4 py-3">Transaction Id</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Payment Status</th>
                  <th className="px-4 py-3">Response Code</th>
                  <th className="px-4 py-3">Card Type</th>
                  <th className="px-4 py-3">Pg Transaction Id</th>
                  <th className="px-4 py-3">Arn</th>
                  <th className="px-4 py-3">Brn</th>
                  <th className="px-4 py-3">Customer Id</th>
                  <th className="px-4 py-3">Order No</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3">Action</th>              
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="px-8 py-3">{order.id}</td>
                    <td className="px-4 pl-12 py-3">{order.transaction_id}</td>
                    <td className="px-4 pl-12 py-3">{order.amount}</td>
                    <td className="px-4 pl-12 py-3">{order.payment_status}</td>
                    <td className="px-4 pl-12 py-3">{order.response_code}</td>
                    <td className="px-4 pl-12 py-3">{order.card_type}</td>
                    <td className="px-4 pl-10 py-3">{order.pg_transaction_id}</td>
                    <td className="px-4 pl-10 py-3">{order.arn}</td>
                    <td className="px-4 pl-10 py-3">{order.brn}</td>
                    <td className="px-4 pl-10 py-3">{order.customer_id}</td>
                    <td className="px-4 pl-10 py-3">{order.order_no}</td>
                    <td className="px-4 pl-10 py-3">{order.created_at}</td>
                    <td className="px-4 py-3 mt-[1.2rem] flex items-center justify-center gap-2">
                      {/* <button className="px-2 py-1 rounded-md">
                        <FaPrint className="text-black text-xl" />
                      </button> */}
                      <button
                        // className="px-
                        className="px-2 py-1 rounded-md"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <MdDelete className="text-red-500 text-xl" />
                      </button>
                      {/* <button className="px-2 py-1 rounded-md">
                        <MdModeEditOutline className="text-black text-xl" />
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
              <button
                onClick={prevPage}
                className="mx-1 px-3 py-2 cursor-pointer"
              >
                <IoIosArrowBack />
              </button>
              {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => (
                  <button
                    key={i}
                    className={`mx-1 px-4 py-2 cursor-pointer ${
                      currentPage === startPage + i
                        ? "border border-black rounded-full"
                        : ""
                    }`}
                    onClick={() => paginate(startPage + i)}
                  >
                    {startPage + i}
                  </button>
                )
              )}
              <button
                onClick={nextPage}
                className="mx-1 px-3 py-2 cursor-pointer"
              >
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
                className="px-4 py-2 bg-red-500 text-white rounded mr-2">
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

