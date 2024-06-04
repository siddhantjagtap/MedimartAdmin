import React, { useState, useEffect } from 'react';
import SideMenu from "../Components/SideMenu";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";
import AddBannerModal from "../Components/AddBannerModal";
import ManageBannerModal from "../Components/ManageBannerModal";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import axios from 'axios';

function Banner() {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
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

  const handleEditBanner = (banner) => {
    setSelectedBanner(banner);
    setShowManageModal(true);
  };

  const handleDeleteBanner = async (id) => {
    try {
      const response = await axios.delete(`${APIURL}/bannerPhotos/${id}`);
      if (response.status === 200) {
        setBanners(banners.filter(banner => banner._id !== id));
        toast.success('Banner deleted successfully');
      } else {
        console.error('Failed to delete banner:', response.statusText);
        toast.error('Failed to delete banner');
      }
    } catch (error) {
      console.error('Error deleting banner:', error.message);
      toast.error('Failed to delete banner');
    }
  };

  return (
    <>
      <div className="flex">
        <SideMenu />
        <div className="flex-grow">
          <Navbar />
          <div className="flex justify-between items-center mt-8 mb-4">
            <h2 className="text-xl font-bold">Banner Photos</h2>
            <button
              className="bg-[#125872] text-white px-4 py-2 rounded-full"
              onClick={() => setShowAddModal(true)}
            >
              Add banner +
            </button>
          </div>
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
                      <td className="px-2 py-3 flex items-center">
                        <button onClick={() => handleEditBanner(banner)} className="text-blue-500 hover:text-blue-700 mr-4">
                          <MdModeEditOutline size={20} />
                        </button>
                        <button onClick={() => handleDeleteBanner(banner._id)} className="text-red-500 hover:text-red-700">
                          <MdDelete size={20} />
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
      <AddBannerModal showModal={showAddModal} setShowModal={setShowAddModal} />
      <ManageBannerModal showModal={showManageModal} setShowModal={setShowManageModal} banner={selectedBanner} />
    </>
  );
}

export default Banner;
