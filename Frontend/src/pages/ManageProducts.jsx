import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SideMenu from '../Components/SideMenu';
import Navbar from '../Components/Navbar';
import AddProductModal from '../Components/AddProductModal';
import ManageProductModal from '../Components/ManageProductModal';

const ManageProducts = () => {
  const [products, setProducts] = useState([
    {
        id: 'P42311',
        image: 'wire_diary.jpg',
        name: 'wire_diary',
        price: 500,
        stock: 200,
      },
      {
          id: 'P42311',
          image: 'wire_diary.jpg',
          name: 'wire_diary',
          price: 500,
          stock: 200,
        },
        {
          id: 'P42312',
          image: 'wire_diary.jpg',
          name: 'wire_diary',
          price: 500,
          stock: 200,
        },
        {
            id: 'P42311',
            image: 'wire_diary.jpg',
            name: 'wire_diary',
            price: 500,
            stock: 200,
          },
          {
            id: 'P42312',
            image: 'wire_diary.jpg',
            name: 'wire_diary',
            price: 500,
            stock: 200,
          },{
            id: 'P42311',
            image: 'wire_diary.jpg',
            name: 'wire_diary',
            price: 500,
            stock: 200,
          },
          {
            id: 'P42312',
            image: 'wire_diary.jpg',
            name: 'wire_diary',
            price: 500,
            stock: 200,
          },{
            id: 'P42311',
            image: 'wire_diary.jpg',
            name: 'wire_diary',
            price: 500,
            stock: 200,
          },
          {
            id: 'P42312',
            image: 'wire_diary.jpg',
            name: 'wire_diary',
            price: 500,
            stock: 200,
          },{
            id: 'P42311',
            image: 'wire_diary.jpg',
            name: 'wire_diary',
            price: 500,
            stock: 200,
          },
          {
            id: 'P42312',
            image: 'wire_diary.jpg',
            name: 'wire_diary',
            price: 500,
            stock: 200,
          },{
            id: 'P42311',
            image: 'wire_diary.jpg',
            name: 'wire_diary',
            price: 500,
            stock: 200,
          },
          {
            id: 'P42312',
            image: 'wire_diary.jpg',
            name: 'wire_diary',
            price: 500,
            stock: 200,
          },
  ]);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    image: '',
    name: '',
    price: 0,
    stock: 0,
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleManageProduct = (product) => {
    setShowManageModal(true);
    setSelectedProduct(product);
  };
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleUpdateProduct = () => {
    // Add logic to update the product data on the server or in the state
    console.log('Updated product:', selectedProduct);
    setShowManageModal(false);
  };


  const handleAddProduct = () => {
    // Add logic to save the new product to the server or state
    console.log('New product:', newProduct);
    setShowModal(false);
    setNewProduct({
      id: '',
      image: '',
      name: '',
      price: 0,
      stock: 0,
    });
  };

  return (
    <div className="flex">
      <SideMenu />
      <div className="flex-grow">
        <Navbar />
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manage products</h2>
            <button
              className="bg-black text-white px-4 py-2 rounded-full"
              onClick={() => setShowModal(true)}
            >
              Add product +
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-3">Product Id</th>
                  <th className="px-4 py-3">Product Image</th>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Product Price</th>
                  <th className="px-4 py-3">Stocks</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    } border-b`}
                  >
                    <td className="px-4 py-3">{product.id}</td>
                    <td className="px-4 py-3">
                      <img
                        src={`/images/${product.image}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">${product.price}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                    <button
                        className="bg-black text-white px-4 py-2 rounded-full"
                        onClick={() => handleManageProduct(product)}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-4">
              <button
                onClick={prevPage}
                className="mx-1 px-3 py-2 cursor-pointer"
              >
                <IoIosArrowBack />
              </button>
              {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => (
                <button
                  key={i}
                  className={`mx-1 px-4 py-2 cursor-pointer ${
                    currentPage === i + 1 ? 'border border-black rounded-full' : ''
                  }`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={nextPage}
                className="mx-1 px-3 py-2 cursor-pointer"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
</div>

      {/* Modal for adding a new product */}
      <AddProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        handleAddProduct={handleAddProduct}
      />
      <ManageProductModal
        showModal={showManageModal}
        setShowModal={setShowManageModal}
        product={selectedProduct}
        handleInputChange={handleInputChange}
        handleUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
};

export default ManageProducts;
