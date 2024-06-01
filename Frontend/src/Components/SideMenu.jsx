import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { MdChecklist } from 'react-icons/md';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { TbMenu2 } from 'react-icons/tb';
import { AiOutlineProduct } from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';import { MdOutlinePlaylistAdd } from "react-icons/md";

import { toast } from 'react-toastify';

function SideMenu() {
    const [open, setOpen] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === 'admin-token') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [navigate]);

    const handleNavigation = (path) => {
        if (isLoggedIn || path === '/') {
            navigate(path);
        } else {
            toast.error('Please login to get access');
            setTimeout(() => {
                navigate('/login');
            }, 100); // Delay the navigation to allow the toast to show
        }
    };

    const menus = [
        { title: 'Dashboard', icon: <MdOutlineSpaceDashboard size={24} />, path: '/' },
        { title: 'Products', icon: <AiOutlineProduct size={24} />, path: '/manageproducts' },
        { title: 'Order List', icon: <MdChecklist size={24} />, path: '/orderlist' },
        { title: 'Users', icon: <AiOutlineUserSwitch size={24} />, path: '/users' },
        { title: 'Order Master', icon: <MdOutlinePlaylistAdd size={24} />, path: '/ordermaster' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className={`flex sticky top-0 h-screen ${open ? 'w-[12.5rem]' : 'w-[4.5rem]'} duration-100 bg-[#125872] text-white`}>
            <div className="p-3">
                {open ? (
                    <RxCross2 onClick={() => setOpen(!open)} className="size-9 cursor-pointer" />
                ) : (
                    <TbMenu2 onClick={() => setOpen(!open)} className="size-9 cursor-pointer" />
                )}
                {open ? (
                    <p className="mt-[3.6rem] text-2xl">Admin Panel</p>
                ) : null}

                <div className="mt-[2rem] text-xl">
                    {menus.map((menu, index) => (
                        <div
                            key={index}
                            onClick={() => handleNavigation(menu.path)}
                            className={`flex items-center gap-x-3 my-7 p-1 cursor-pointer ${isActive(menu.path) ? 'bg-[#0d4255] rounded-md text-white' : ''}`}
                        >
                            {React.cloneElement(menu.icon, { size: 32 })}
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
