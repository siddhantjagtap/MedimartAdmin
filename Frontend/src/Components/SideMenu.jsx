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
        { title: 'Admin Panel', icon: <RiAdminLine size={24} />, path: '/' },
        { title: 'Dashboard', icon: <RxDashboard size={24} />, path: '/dashboard' },
        { title: 'Order List', icon: <MdChecklist size={24} />, path: '/orderlist' },
        { title: 'Order Status', icon: <TbStatusChange size={24} />, path: '/orderstatus' },
        { title: 'Billing', icon: <RiBillLine size={24} />, path: '/billing' },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className={`flex sticky top-0 h-screen ${open ? 'w-[14rem]' : 'w-[4.5rem]'} duration-100 bg-stone-950 text-white`}>
            <div className="p-3">
                {open ? (
                    <RxCross2 onClick={() => setOpen(!open)} className="size-9 cursor-pointer " />
                ) : (
                    <TbMenu2 onClick={() => setOpen(!open)} className="size-9 cursor-pointer " />
                )}
                <div className='mt-[3.6rem] text-xl'>
                    {menus.map((menu, index) => (
                        <Link key={index} to={menu.path} className={`flex items-center gap-x-3 mb-7 p-1  ${isActive(menu.path) ? 'bg-gray-700 rounded-md text-white' : ''}`}>
                            {React.cloneElement(menu.icon, { size: 32 })}
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default SideMenu;
