import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductModal = ({ showModal, setShowModal }) => {
  const [productId, setProductId] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [name, setName] = useState("");
  const [composition, setComposition] = useState("");
  const [uses, setUses] = useState("");
  const [sideEffects, setSideEffects] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [price, setPrice] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [directionsForUse, setDirectionsForUse] = useState("");
  const [description, setDescription] = useState("");

  const APIURL = import.meta.env.VITE_MEDIMART_URL;

  const handleAddProduct = async () => {
    try {
      const addProduct = {
        Product_id: productId,
        Category: category,
        Sub_Category: subCategory,
        Name: name,
        Composition: composition,
        Uses: uses,
        Side_effects: sideEffects,
        Image_URL: imageFile, // Handle image file separately if needed
        Manufacturer: manufacturer,
        Price: parseFloat(price), // Convert price to a number
        Return_Policy: returnPolicy,
        Directions_for_Use: directionsForUse,
        Description: description,
      };

      const response = await axios.post(`${APIURL}/addproduct`, addProduct);

      if (response.status === 201) {
        console.log('Product added successfully:', response.data);
        setShowModal(false);
        toast.success('Product added successfully');
      } else {
        console.error('Failed to add product:', response.statusText);
        toast.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
      toast.error('Failed to add product');
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add Product</h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Product ID</label>
                      <input
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product ID"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Category</label>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Category"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Sub Category</label>
                      <input
                        type="text"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Sub Category"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Composition</label>
                      <input
                        type="text"
                        value={composition}
                        onChange={(e) => setComposition(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Composition"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Uses</label>
                      <input
                        type="text"
                        value={uses}
                        onChange={(e) => setUses(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Uses"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Side Effects</label>
                      <input
                        type="text"
                        value={sideEffects}
                        onChange={(e) => setSideEffects(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Side Effects"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Image</label>
                      <input
                        type="text"
                        onChange={(e) => setImageFile(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Manufacturer</label>
                      <input
                        type="text"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Manufacturer"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Price</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Price"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Return Policy</label>
                      <input
                        type="text"
                        value={returnPolicy}
                        onChange={(e) => setReturnPolicy(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Return Policy"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Directions for Use</label>
                      <input
                        type="text"
                        value={directionsForUse}
                        onChange={(e) => setDirectionsForUse(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Directions for Use"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Description</label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="appearance-none border rounded-full w-full py-3 px-3 text-white bg-[#125872] mb-[1rem]"
                onClick={handleAddProduct}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddProductModal;
