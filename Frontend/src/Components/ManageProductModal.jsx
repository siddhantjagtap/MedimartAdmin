import React from 'react';

const ManageProductModal = ({ showModal, setShowModal, product, handleInputChange, handleUpdateProduct }) => {
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
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Manage product</h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="productName"
                        name="name"
                        value={product.name}
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
                        value={product.price}
                        onChange={handleInputChange}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product Price"
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
                      {product.image && (
                        <img
                          src={`/images/${product.image}`}
                          alt={product.name}
                          className="mt-2 w-16 h-16 object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleUpdateProduct}
              >
                Update
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default ManageProductModal;