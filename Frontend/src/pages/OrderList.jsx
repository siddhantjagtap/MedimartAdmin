
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPrint } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SideMenu from '../Components/SideMenu';
import Navbar from '../Components/Navbar';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const apiUrl = import.meta.env.VITE_NEXIBLE_URL;
  const apikey = import.meta.env.VITE_API_Key;

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
          
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl, apikey]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="flex">
      <SideMenu />
      <div className="flex-grow">
        <Navbar />
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order List</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Order No</th>
                  <th className="px-4 py-3">Order Date</th>
                  <th className="px-4 py-3">Customer ID</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">First Name</th>
                  <th className="px-4 py-3">Last Name</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.orderNo}</td>
                    <td className="px-4 py-3">{order.orderDate}</td>
                    <td className="px-4 py-3">{order.customerID}</td>
                    <td className="px-4 py-3">{order.eMail}</td>
                    <td className="px-4 py-3">{order.firstName}</td>
                    <td className="px-4 py-3">{order.lastName}</td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <button className="px-2 py-1 rounded-md">
                        <FaPrint className="text-black text-xl" />
                      </button>
                      <button className="px-2 py-1 rounded-md">
                        <MdDelete className="text-black text-xl" />
                      </button>
                      <button className="px-2 py-1 rounded-md">
                        <MdModeEditOutline className="text-black text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-4">
              <button onClick={prevPage} className="mx-1 px-3 py-2 cursor-pointer">
                <IoIosArrowBack />
              </button>
              {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }, (_, i) => (
                <button
                  key={i}
                  className={`mx-1 px-4 py-2 cursor-pointer ${currentPage === i + 1 ? 'border border-black rounded-full' : ''
                    }`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={nextPage} className="mx-1 px-3 py-2 cursor-pointer">
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
