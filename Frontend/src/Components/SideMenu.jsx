import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { RiAdminLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { MdChecklist } from "react-icons/md";
import { RiBillLine } from 'react-icons/ri';
import { TbStatusChange } from 'react-icons/tb';
import { TbMenu2 } from 'react-icons/tb';

function SideMenu() {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    const menus = [
        { title: 'Admin Panel', icon: <RiAdminLine />, path: '/' },
        { title: 'Dashboard', icon: <RxDashboard />, path: '/dashboard' },
        { title: 'Order List', icon: <MdChecklist />, path: '/orderlist' },
        { title: 'Order Status', icon: <TbStatusChange />, path: '/orderstatus' },
        { title: 'Billing', icon: <RiBillLine />, path: '/billing' },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className={`flex fixed h-screen ${open ? 'w-[15rem]' : 'w-[3.5rem]'} duration-200 bg-stone-950 text-white`}>
            <div className="p-3">
                {open ? (
                    <RxCross2 onClick={() => setOpen(!open)} className="size-9 cursor-pointer " />
                ) : (
                    <TbMenu2 onClick={() => setOpen(!open)} className="size-9 cursor-pointer " />
                )}
                <div className='mt-[7rem] text-2xl'>
                    {menus.map((menu, index) => (
                        <Link key={index} to={menu.path} className={`flex items-center gap-x-3 mb-4 ${isActive(menu.path) ? 'bg-gray-700 p-[0.5rem] rounded-md text-white' : ''}`}>
                            {menu.icon}
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
