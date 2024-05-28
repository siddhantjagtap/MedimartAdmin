import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from "../Components/SideMenu";
import Navbar from "../Components/Navbar";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Users() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 
    const pagesToShow = 5; // Same number of pages to show as in OrderList

    const APIURL = import.meta.env.VITE_MEDIMART_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${APIURL}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
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
                <div className="bg-white p-2 rounded-lg">
                    <div className="sticky top-0 bg-white p-2 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <input
                                type="text"
                                placeholder="Search by username..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-4 border border-gray-300 rounded-full w-[85%] focus:outline-none focus:ring-1 focus:ring-[#125872]"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {currentUsers.length > 0 ? (
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-200 border-b border-gray-300">
                                        <th className="px-2 py-3 text-left">No</th>
                                        <th className="px-2 py-3 text-left">User ID</th>
                                        <th className="px-2 py-3 text-left">Customer ID</th>
                                        <th className="px-2 py-3 text-left">Username</th>
                                        <th className="px-2 py-3 text-left">Email</th>
                                        <th className="px-2 py-3 text-left">Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr
                                            key={user._id}
                                            className={`${
                                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                            } border-b border-gray-300`}
                                        >
                                            <td className="px-2 py-3">{indexOfFirstItem + index + 1}</td>
                                            <td className="px-2 py-3">{user._id.slice(0, 9)}...</td>
                                            <td className="px-2 py-3">{user.customerId.slice(0, 9)}...</td>
                                            <b><td className="px-2 py-3">{user.username}</td></b>
                                            <td className="px-2 py-3">{user.email}</td>
                                            <td className="px-2 py-3">{user.password.slice(0, 14)}...</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center my-4">No users found.</div>
                        )}
                        <div className="flex justify-center mt-2">
                            <button onClick={prevPage} className="mx-1 px-3 py-2  rounded-full" disabled={currentPage === 1}>
                                <IoIosArrowBack />
                            </button>
                            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                                <button
                                    key={i}
                                    className={`mx-1 px-4 py-2 cursor-pointer ${
                                        currentPage === startPage + i ? 'border border-black rounded-full' : ''
                                    }`}
                                    onClick={() => paginate(startPage + i)}
                                >
                                    {startPage + i}
                                </button>
                            ))}
                            <button onClick={nextPage} className="mx-1 px-3 py-2  rounded-full" disabled={currentPage === totalPages}>
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
