import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageBannerModal = ({ showModal, setShowModal, banner }) => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState("");
  const APIURL = 'https://medicine-website-two.vercel.app/api/updatebanner'; // Updated API URL

  useEffect(() => {
    if (banner) {
      setTitle(banner.Title);
      setImageFile(banner.Image);
    }
  }, [banner]);

  const handleUpdateBanner = async () => {
    try {
      const updatedBanner = {
        Title: title,
        Image: imageFile, // Handle image file upload separately if needed
      };

      const response = await axios.put(`${APIURL}/${banner._id}`, updatedBanner); // Updated API request

      if (response.status === 200) {
        console.log('Banner updated successfully:', response.data);
        setShowModal(false);
        toast.success('Banner updated successfully');
      } else {
        console.error('Failed to update banner:', response.statusText);
        toast.error('Failed to update banner');
      }
    } catch (error) {
      console.error('Error updating banner:', error.message);
      toast.error('Failed to update banner');
    }
  };

  return (
    showModal && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                <IoCloseOutline size={24} />
              </button>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Manage Banner</h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Image URL</label>
                      <input
                        type="text"
                        value={imageFile}
                        onChange={(e) => setImageFile(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="appearance-none border rounded-full w-full py-3 px-3 text-white bg-[#125872] mb-2 sm:mb-0 sm:w-auto sm:ml-2"
                onClick={handleUpdateBanner}
              >
                Update
              </button>
              <button
                type="button"
                className="appearance-none border rounded-full w-full py-3 px-3 text-gray-700 bg-gray-200 sm:w-auto"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ManageBannerModal;
