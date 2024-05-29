import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageProductModal = ({ showModal, setShowModal, product }) => {
  const APIURL = `${import.meta.env.VITE_MEDIMART_URL}/updateproduct/${product?.Product_id}`;

  const [productId, setProductId] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [name, setName] = useState('');
  const [composition, setComposition] = useState('');
  const [uses, setUses] = useState('');
  const [sideEffects, setSideEffects] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [price, setPrice] = useState('');
  const [returnPolicy, setReturnPolicy] = useState('');
  const [directionsForUse, setDirectionsForUse] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (product) {
      setProductId(product.Product_id);
      setCategory(product.Category);
      setSubCategory(product.Sub_Category);
      setName(product.Name);
      setComposition(product.Composition);
      setUses(product.Uses);
      setSideEffects(product.Side_effects);
      setManufacturer(product.Manufacturer);
      setPrice(product.Price);
      setReturnPolicy(product.Return_Policy);
      setDirectionsForUse(product.Directions_for_Use);
      setDescription(product.Description);
    }
  }, [product]);

  const handleUpdateProduct = async () => {
    try {
      const updatedProduct = {
        Product_id: productId,
        Category: category,
        Sub_Category: subCategory,
        Name: name,
        Composition: composition,
        Uses: uses,
        Side_effects: sideEffects,
        Manufacturer: manufacturer,
        Price: price,
        Return_Policy: returnPolicy,
        Directions_for_Use: directionsForUse,
        Description: description,
        Image_URL: imageFile 
      };

      const response = await axios.put(APIURL, updatedProduct, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('Product updated successfully');
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product')
     
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Manage Product</h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Product ID</label>
                      <input
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product ID"
                        readOnly
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
                      <label className="block text-gray-700 font-bold mb-2">Image URL</label>
                      <input
                        type="text"
                        onChange={(e) => setImageFile(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {product?.image && (
                        <img
                          src={`/images/${product.image}`}
                          alt={product.name}
                          className="mt-2 w-16 h-16 object-cover"
                        />
                      )}
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
                onClick={handleUpdateProduct}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ManageProductModal;