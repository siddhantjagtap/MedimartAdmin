<<<<<<< HEAD
// import React from 'react'

// function OrderList() {
//   return (
//     <div><p>Order List</p>
//     </div>
//   )
// }

// export default OrderList
import React, { useState } from 'react';
import { FaPrint, FaShippingFast } from 'react-icons/fa';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

function OrderListOrderStatus() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      email: 'john@example.com',
      order_cost: 500 ,
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 2,
      email: 'jane@example.com',
      order_cost: 700 ,
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Shipped',
    },
    {
      id: 3,
      email: 'john@example.com',
      order_cost: 500 ,
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 4,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Shipped',
    },
    {
      id: 5,
      email: 'john@example.com',
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 6,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Shipped',
    },
    {
      id: 7,
      email: 'john@example.com',
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 8,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Shipped',
    },
    {
      id: 9,
      email: 'john@example.com',
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 10,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Shipped',
    },
    {
      id: 11,
      email: 'john@example.com',
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 12,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
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

=======
import React, { useState } from 'react';
import { FaPrint, FaShippingFast } from 'react-icons/fa';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

function OrderList() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      email: 'john@example.com',
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 2,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Shipped',
    },
    {
      id: 3,
      email: 'john@example.com',
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 4,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Shipped',
    },
    {
      id: 5,
      email: 'john@example.com',
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 6,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Shipped',
    },
    {
      id: 7,
      email: 'john@example.com',
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 8,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Shipped',
    },
    {
      id: 9,
      email: 'john@example.com',
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 10,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Shipped',
    },
    {
      id: 11,
      email: 'john@example.com',
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      deliveryStatus: 'Not Shipped',
    },
    {
      id: 12,
      email: 'jane@example.com',
      orderStatus: 'Processing',
      paymentStatus: 'Unpaid',
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

>>>>>>> 97c266bbe71e7a311503dceaf84b37509c5fd2bb
  return (
    <div className="bg-white p-4 rounded-lg ">
      <h2 className="text-xl font-bold mb-[1rem]">Order Status</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Order Status</th>
              <th className="px-4 py-3">Payment status</th>
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
                <td className="px-4 py-3 pl-[4vw] ">{order.id}</td>
                <td className="px-4 py-3 pl-[4vw]">{order.email}</td>
                <td className="px-4 py-3 flex pl-[2vw]">{order.orderStatus}</td>
                <td className="px-4 py-3 pl-[5vw]">{order.paymentStatus}</td>
                <td className="px-4 py-3 pl-[3vw]">{order.deliveryStatus}</td>
                <td className="px-4 py-3 flex items-center justify-center gap-2">
                  <button className=" text-white px-2 py-1 rounded-md">
                    <FaPrint className="text-yellow-500 text-xl" />
                  </button>
                  <button className=" text-white px-2 py-1 rounded-md">
                    <FaShippingFast className="text-blue-500 text-xl" />
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
<<<<<<< HEAD
    </div>
  );
=======
    </div>)
>>>>>>> 97c266bbe71e7a311503dceaf84b37509c5fd2bb
}

export default OrderList;
