import React, { useState, useEffect } from 'react';
import SideMenu from "../Components/SideMenu";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import axios from 'axios';

function Banner(){
    const [loading, setLoading] = useState(true);
    const [banners, setBanners] = useState([]);
    const APIURL = import.meta.env.VITE_MEDIMART_URL;

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`${APIURL}/bannerPhotos`);
                setBanners(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching banner photos:', error);
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    return (
        <>
            <div className="flex">
                <SideMenu />
                <div className="flex-grow">
                    <Navbar />
                    <h2 className="text-xl font-bold mb-4 mt-[2rem]">Banner Photos</h2>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <Loading />
                        ) : (
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-3">No</th>
                                        <th className="px-4 py-3">Title</th>
                                        <th className="px-4 py-3">Image</th>
                                        <th className="px-2 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {banners.map((banner, index) => (
                                        <tr key={banner._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                            <td className="px-2 py-3">{index + 1}</td>
                                            <td className="px-2 pl-12 py-3">{banner.Title}</td>
                                            <td className="px-2 pl-12 py-3"><img src={banner.Image} alt={banner.Title} className="w-32 h-auto" /></td>
                                            <td className="px-2 py-3 text-xl mt-[1rem] flex gap-2">
                                                <button
                                                    className="text-green-500 hover:text-green-700 px-2 py-2 rounded-full"
                                                    onClick={() => handleEditBanner(banner)}
                                                >
                                                    <MdModeEditOutline />
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700 px-2 py-2 rounded-full"
                                                    onClick={() => handleDeleteBanner(banner._id)}
                                                >
                                                    <MdDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
