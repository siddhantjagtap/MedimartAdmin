import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SideMenu from "../Components/SideMenu";
import Navbar from "../Components/Navbar";
import AddProductModal from "../Components/AddProductModal";
import ManageProductModal from "../Components/ManageProductModal";
import axios from "axios";
import Loading from "../Components/Loading";

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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://medicine-website-two.vercel.app/api/data`, {
        headers: {
          "API-Key": import.meta.env.VITE_API_Key,
        },
      })
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = () => {
    const filtered = products.filter((product) => {
      const startDateValid = !startDate || new Date(product.valid_from) >= new Date(startDate);
      const endDateValid = !endDate || new Date(product.valid_till) <= new Date(endDate + "T23:59:59");
      return startDateValid && endDateValid;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset pagination to the first page after filtering
  };

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

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleUpdateProduct = () => {
    // Add logic to update the product data on the server or in the state
    console.log("Updated product:", selectedProduct);
    setShowManageModal(false);
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
          </div>
          <div className="flex justify-between items-center mb-2 mt-[2rem]">
            <h2 className="text-xl font-bold">Manage products</h2>
            <button
              className="bg-[#125872] text-white px-2 py-2 rounded-full"
              onClick={() => setShowModal(true)}
            >
              Add product +
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-2 py-3">Id</th>
                  <th className="px-2 py-3">Name</th>
                  <th className="px-2 py-3">Price</th>
                  {/* <th className="px-2 py-3">Category</th> */}
                  <th className="px-2 py-3"> Category</th>
                  {/* <th className="px-2 py-3">Composition</th> */}
                  <th className="px-2 py-3">Image</th>
                  <th className="px-2 py-3">Manufacturer</th>
                  {/* <th className="px-2 py-3">Return Policy</th> */}
                  <th className="px-2 py-3">Actions</th>
                </tr>
              </thead>
              {loading ? (
                <Loading />
              ) : currentProducts.length > 0 ? (
                <tbody>
                  {currentProducts.map((product, index) => (
                    <tr
                      key={product._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } border-b`}
                    >
                      <td className="px-2 py-3">{product.Product_id}</td>
                      <td className="px-2 py-3">{product.Name}</td>
                      <td className="px-2 py-3">{product.Price}</td>
                      {/* <td className="px-2 py-3">{product.Category}</td> */}
                      <td className="px-2 py-3">{product.Sub_Category}</td>
                      {/* <td className="px-2 py-3">{product.Composition}</td> */}
                      <td className="px-2 py-3">
                        <img
                          src={product.Image_URL}
                          alt={product.Name}
                          className="w-28 h-20 object-cover"
                        />
                      </td>
                      <td className="px-2 py-3">{product.Manufacturer}</td>
                      {/* <td className="px-2 py-3">{product.Return_Policy}</td> */}
                      <td className="px-2 py-3 flex gap-2">
                        <button
                          className="bg-[#125872] text-white px-2 py-2 rounded-full"
                          onClick={() => handleManageProduct(product)}
                        >
                          Manage
                        </button>
                        <button
                          className="bg-[#125872] text-white px-2 py-2 rounded-full"
                          onClick={() => handleDeleteProduct(product.Product_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="14" className="px-2 py-3 text-center">
                      No products found.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
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
    </div>
  );
};

export default ManageProducts;
