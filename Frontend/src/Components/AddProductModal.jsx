import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const AddProductModal = ({ showModal, setShowModal, newProduct, handleInputChange, handleAddProduct }) => {
  

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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add new product</h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="productName"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">
                        Product Price
                      </label>
                      <input
                        type="number"
                        id="productPrice"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product Price"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">
                        Product Description
                      </label>
                      <input
                        type="text"
                        id="productName"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="productImage" className="block text-gray-700 font-bold mb-2">
                        Product Image
                      </label>
                      <input
                        type="file"
                        id="productImage"
                        name="image"
                        onChange={handleInputChange}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="productImage" className="block text-gray-700 font-bold mb-2">
                        Product Keyline Image 
                      </label>
                      <input
                        type="file"
                        id="productImage"
                        name="image"
                        onChange={handleInputChange}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="appearance-none border rounded-full w-full py-3 px-3 text-white bg-black mb-[1rem]"
                onClick={handleAddProduct}
              >
                Add product
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddProductModal;