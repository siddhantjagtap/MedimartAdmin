import React from 'react';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';

const AddProductModal = ({ showModal, setShowModal }) => {
  const [productname, setProductname] = useState("");
  const [productDesc, setproductDesc] = useState("");
  const [productcategory, setProductcategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productqty, setProductqty] = useState("");
  const [fileimage, setImagefile] = useState(null);
  const [keylineImage, setKeylineimage] = useState(null);
  const getDefaultDateISOString = () => new Date().toISOString();
  const [validfrom, setValidFrom] = useState(getDefaultDateISOString);
  const [validtill, setValidTill] = useState(getDefaultDateISOString);

  const handleValidFromChange = (e) => {
    const date = new Date(e.target.value);
    setValidFrom(date.toISOString());
  };

  const handleValidTillChange = (e) => {
    const date = new Date(e.target.value);
    setValidTill(date.toISOString());
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedProduct = {
        cno: '',
        sku: '',
        dispseq: '',
        name: productname,
        description: productDesc,
        currency: '',
        price: parseFloat(productPrice), // Convert price to a number
        salePrice: '',
        prodtime: '',
        rol: '',
        category: productcategory,
        qty: parseInt(productqty), // Convert qty to a number
        unit: '',
        cost_center: '',
        modifier_group: '',
        maxaddon: '',
        finishing: '',
        income_head: '',
        tax_group: '',
        online: '',
        popular: '',
        promotion: '',
        active: '',
        image: fileimage,
        location: '',
        tag_line: '',
        valid_from: validfrom,
        valid_till: validtill,
        url: '',
        keylineimage: keylineImage,
      };

      const nexibleUrl = import.meta.env.VITE_NEXIBLE_URL;
      const apiKey = import.meta.env.VITE_API_Key;

      const response = await axios.post(`${nexibleUrl}/product`, updatedProduct);

      if (response.status === 200) {
        console.log('Product updated successfully');
        setShowModal(false);
      } else {
        console.error('Failed to update product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error.message);
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add product</h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={productname}
                        onChange={(e) => setProductname(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={productDesc}
                        onChange={(e) => setproductDesc(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product Description"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={productcategory}
                        onChange={(e) => setProductcategory(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product category"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product Price"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={productqty}
                        onChange={(e) => setProductqty(e.target.value)}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Product Quantity"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Valid From
                      </label>
                      <input
                        type="datetime-local"
                        value={validfrom ? validfrom.substring(0, 16) : ''}
                        onChange={handleValidFromChange}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Valid From"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Valid Till
                      </label>
                      <input
                        type="datetime-local"
                        value={validtill ? validtill.substring(0, 16) : ''}
                        onChange={handleValidTillChange}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Valid Till"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Product Image
                      </label>
                      <input
                        type="file"
                        id="productImage"
                        onChange={(e) => setImagefile(e.target.files[0])}
                        className="appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Keyline image
                      </label>
                      <input
                        type="file"
                        id="productkeylineimage"
                        onChange={(e) => setKeylineimage(e.target.files[0])}
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
                className="appearance-none border rounded-full w-full py-3 px-3 text-white bg-[#125872] mb-[1rem]"
                onClick={handleUpdateProduct}
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
