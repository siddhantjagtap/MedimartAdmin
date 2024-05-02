import React, { useState } from 'react';
import { FaPrint, FaShippingFast } from 'react-icons/fa';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SideMenu from '../Components/SideMenu';
import Navbar from '../Components/Navbar';
function OrderList() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      email: 'john@example.com',
      ordercost: 5000,
      paymentStatus: 'Paid',
      customerid: 1234,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 2,
      email: 'jane@example.com',
      ordercost: 9000,
      paymentStatus: 'Unpaid',
      customerid: 4321,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Shipped',
    },
    {
      id: 3,
      email: 'john@example.com',
      ordercost: 5000,
      paymentStatus: 'Paid',
      customerid: 1234,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 4,
      email: 'jane@example.com',
      ordercost: 9000,
      paymentStatus: 'Unpaid',
      customerid: 1256,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Shipped',
    },
    {
      id: 5,
      email: 'john@example.com',
      ordercost: 5000,
      paymentStatus: 'Paid',
      customerid: 1457,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 6,
      email: 'jane@example.com',
      ordercost: 9000,
      paymentStatus: 'Unpaid',
      customerid: 9864,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Shipped',
    },
    {
      id: 7,
      email: 'john@example.com',
      ordercost: 5000,
      paymentStatus: 'Paid',
      customerid: 9765,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 8,
      email: 'jane@example.com',
      ordercost: 9000,
      paymentStatus: 'Unpaid',
      customerid: 5443,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Shipped',
    },
    {
      id: 9,
      email: 'john@example.com',
      ordercost: 5000,
      paymentStatus: 'Paid',
      customerid: 2356,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 10,
      email: 'jane@example.com',
      ordercost: 9000,
      paymentStatus: 'Unpaid',
      customerid: 9876,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Shipped',
    },
    {
      id: 11,
      email: 'john@example.com',
      ordercost: 5000,
      paymentStatus: 'Paid',
      customerid: 9767,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 12,
      email: 'jane@example.com',
      ordercost: 9000,
      paymentStatus: 'Unpaid',
      customerid: 4668,
      transaction_id: "TRX001",
      product_id: "PROD001",
      deliveryStatus: 'Shipped',
    },
  ]);
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
    <div className="bg-white p-4 rounded-lg ">
      <h2 className="text-xl font-bold mb-[1rem]">Order List</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Order Cost</th>
              <th className="px-4 py-3">Payment status</th>
              <th className="px-4 py-3">Customer ID</th>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Product ID</th>
              <th className="px-4 py-3">Delivery status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-b `}
              >
                <td className="px-4 py-3 ">{order.id}</td>
                <td className="px-4 py-3">{order.email}</td>
                <td className="px-4 py-3 flex">{order.ordercost}</td>
                <td className="px-4 py-3 ">{order.paymentStatus}</td>
                <td className="px-4 py-3 ">{order.customerid}</td>
                <td className="px-4 py-3 ">{order.transaction_id}</td>
                <td className="px-4 py-3 ">{order.product_id}</td>
                <td className="px-4 py-3 ">{order.deliveryStatus}</td>
                <td className="px-4 py-3 flex items-center justify-center gap-2">
                  <button className=" px-2 py-1 rounded-md">
                    <FaPrint className="text-black text-xl" />
                  </button>
                  <button className="px-2 py-1 rounded-md">
                  <MdDelete className="text-black text-xl" />
                  </button>
                  <button className="px-2 py-1 rounded-md">
                  <MdModeEditOutline className='text-black text-xl' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     
        <div className="flex justify-center mt-4">
          <button onClick={prevPage} className="mx-1 px-3 py-2 cursor-pointer ">
          <IoIosArrowBack />
          </button>
          {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              className={`mx-1 px-4 py-2 cursor-pointer ${
                currentPage === i + 1 ? 'border border-black   rounded-full ' : ''
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={nextPage} className="mx-1 px-3 py-2 cursor-pointer ">
          <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
    </div>

</div>
    )
}

export default OrderList
