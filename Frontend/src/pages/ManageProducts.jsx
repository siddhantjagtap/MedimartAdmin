import React, { useState, useEffect, useMemo, useCallback } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SideMenu from "../Components/SideMenu";
import Navbar from "../Components/Navbar";
import AddProductModal from "../Components/AddProductModal";
import ManageProductModal from "../Components/ManageProductModal";
import axios from "axios";
import Loading from "../Components/Loading";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import debounce from "lodash.debounce";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const [productId, setProductId] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteProductId, setDeleteProductId] = useState(null);

  const APIURL = import.meta.env.VITE_MEDIMART_URL;

  const fetchData = useCallback(
    debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await axios.get(`${APIURL}/data`);
        const data = response.data;
        const filteredData = data.filter((product) =>
          product.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.Sub_Category?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm, fetchData]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Sub_Category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = useMemo(() => {
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, indexOfFirstItem, indexOfLastItem]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
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
    setProductId(product.Product_id);
  };

  const handleDeleteProduct = (productId) => {
    setDeleteProductId(productId);
  };

  const confirmDeleteProduct = async () => {
    try {
      await axios.delete(`${APIURL}/deleteproduct/${deleteProductId}`, {
        headers: {
          "API-Key": import.meta.env.VITE_API_Key,
        },
      });
      setProducts(products.filter(product => product.Product_id !== deleteProductId));
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeleteProductId(null);
    }
  };

  const cancelDeleteProduct = () => {
    setDeleteProductId(null);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pageNumbers = [];
    const maxPagesToShow = 10;
    const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`mx-1 px-2 py-2 cursor-pointer ${
            currentPage === i ? "border border-black rounded-full" : ""
          }`}
          onClick={() => paginate(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex">
      <SideMenu />
      <div className="flex-grow">
        <Navbar />
        <div className="bg-white p-2 rounded-lg">
          <div className="sticky top-0 bg-white p-2 rounded-lg z-10">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-4 border border-gray-300 rounded-full w-[85%] focus:outline-none focus:ring-1 focus:ring-[#125872]"
              />
              <button
                className="bg-[#125872] text-white px-4 py-2 rounded-full"
                onClick={() => setShowModal(true)}
              >
                Add product +
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <Loading />
            ) : currentProducts.length > 0 ? (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-2 py-3">No</th>
                    <th className="px-2 py-3">Id</th>
                    <th className="px-2 py-3">Name</th>
                    <th className="px-2 py-3">Price</th>
                    <th className="px-2 py-3">Category</th>
                    <th className="px-2 py-3">Image</th>
                    <th className="px-2 py-3">Manufacturer</th>
                    <th className="px-2 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product, index) => (
                    <tr
                      key={product._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } border-b`}
                    >
                      <td className="px-2 py-3">{indexOfFirstItem + index + 1}</td>
                      <td className="px-2 py-3">{product.Product_id}</td>
                      <td className="px-2 py-3">{product.Name}</td>
                      <td className="px-2 py-3">₹{product.Price}</td>
                      <td className="px-2 py-3">{product.Sub_Category}</td>
                      <td className="px-2 py-3">
                        <img
                          src={product.Image_URL}
                          alt={product.Name}
                          className="w-[15rem] h-[10rem] object-cover"
                        />
                      </td>
                      <td className="px-2 py-3">{product.Manufacturer}</td>
                      <td className="px-2 py-3 text-xl mt-[1rem] flex gap-2">
                        <button
                          className=" text-green-500 hover:text-green-700 px-2 py-2 rounded-full"
                          onClick={() => handleManageProduct(product)}
                        >
                          <MdModeEditOutline />
                        </button>
                        <button
                          className=" text-red-500 hover:text-red-700 px-2 py-2 rounded-full"
                          onClick={() => handleDeleteProduct(product.Product_id)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center my-4">No products found.</div>
            )}
            <div className="flex justify-center mt-2">
              <button onClick={prevPage} className="mx-1 px-3 py-2 cursor-pointer">
                <IoIosArrowBack />
              </button>
              {renderPageNumbers()}
              <button onClick={nextPage} className="mx-1 px-3 py-2 cursor-pointer">
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
        <AddProductModal showModal={showModal} setShowModal={setShowModal} newProduct={newProduct} />
        <ManageProductModal
          showModal={showManageModal}
          setShowModal={setShowManageModal}
          product={selectedProduct}
          productId={productId}
        />
      </div>
      {deleteProductId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmDeleteProduct}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={cancelDeleteProduct}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
