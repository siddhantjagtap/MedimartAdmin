import React from 'react'
import SideMenu from '../Components/SideMenu';
import Navbar from '../Components/Navbar';

function ManageProduct() {
    return (
        <>
            <div className="flex">
                <SideMenu />
                <div className="flex-grow">
                    <Navbar />
                    <h1>Manage Products</h1>
                </div>
            </div>
        </>
    )
}

export default ManageProduct
