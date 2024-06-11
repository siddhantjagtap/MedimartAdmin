import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from "../Components/SideMenu";
import Navbar from "../Components/Navbar";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Loading from '../Components/Loading';

function Users() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const pagesToShow = 5;

    const APIURL = import.meta.env.VITE_MEDIMART_URL;

    useEffect(() => {
        setLoading(true);
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${APIURL}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
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
                    <h2 className="text-xl font-bold mb-4">Users List</h2>
                    {loading && <Loading />}
                    {!loading && (
                        <div className="overflow-x-auto">
                            {currentUsers.length > 0 ? (
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-gray-200 border-b border-gray-300">
                                            <th className="px-2 py-3 text-left">No</th>
                                            {/* <th className="px-2 py-3 text-left">Username</th> */}
                                            <th className="px-2 py-3 text-left">Full Name</th>
                                            <th className="px-2 py-3 text-left">Email</th>
                                            <th className="px-2 py-3 text-left">Mobile Number</th>
                                            {/* <th className="px-2 py-3 text-left">Delivery Address</th> */}
                                            <th className="px-2 py-3 text-left">Date of Birth</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentUsers.map((user, index) => (
                                            <tr
                                                key={user._id}
                                                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b border-gray-300`}
                                            >
                                                <td className="px-2 py-3">{indexOfFirstItem + index + 1}</td>
                                                {/* <td className="px-2 py-3">
                                                    <b>{user.username}</b>
                                                </td> */}
                                                <td className="px-2 py-3">
                                                    <b>{user.fullName}</b>
                                                </td>
                                                <td className="px-2 py-3">
                                                    <div className="relative group">
                                                        {user.email?.length > 15 ? (
                                                            <span className="truncate max-w-xs inline-block">
                                                                {user.email.slice(0, 15)}...
                                                            </span>
                                                        ) : (
                                                            user.email
                                                        )}
                                                        <div className="absolute left-0 w-auto p-2 min-w-max bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-3">
                                                    <div className="relative group">
                                                        {user.contactNumber?.length > 12 ? (
                                                            <span className="truncate max-w-xs inline-block">
                                                                {user.contactNumber.slice(0, 12)}...
                                                            </span>
                                                        ) : (
                                                            user.contactNumber
                                                        )}
                                                        <div className="absolute left-0 w-auto p-2 min-w-max bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {user.contactNumber}
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* <td className="px-2 py-3">
                                                    <div className="relative group">
                                                        {user.deliveryAddress?.length > 20 ? (
                                                            <span className="truncate max-w-xs inline-block">
                                                                {user.deliveryAddress.slice(0, 20)}...
                                                            </span>
                                                        ) : (
                                                            user.deliveryAddress
                                                        )}
                                                        <div className="absolute left-0 w-auto p-2 min-w-max bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {user.deliveryAddress}
                                                        </div>
                                                    </div>
                                                </td> */}
                                                <td className="px-2 py-3">
                                                    {user.dateOfBirth ? user.dateOfBirth.split('T')[0] : 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center my-4">No users found.</div>
                            )}
                            <div className="flex justify-center mt-2">
                                <button onClick={prevPage} className="mx-1 px-3 py-2 rounded-full" disabled={currentPage === 1}>
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
                                <button onClick={nextPage} className="mx-1 px-3 py-2 rounded-full" disabled={currentPage === totalPages}>
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Users;
