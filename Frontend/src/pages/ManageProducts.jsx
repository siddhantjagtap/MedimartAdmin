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

  return (
    <div className="flex">
      <SideMenu />
      <div className="flex-grow">
        <Navbar />
        <div className="bg-white p-4 rounded-lg">
          <div className="sticky top-0 bg-white p-4 rounded-lg z-10">
            <div className="relative w-[77.75rem] h-[3.5625rem] mt-[1.5rem]">
              <div className="absolute w-[17rem] h-[3.5625rem] top-0 left-0">
                <div className="w-[17rem] relative h-[3.5625rem] bg-white rounded-[2.8125rem] border border-solid border-[#a8a8a8]">
                  <div className="absolute w-[4.5625rem] top-[0.375rem] left-[1.375rem] font-medium text-black text-[0.875rem] tracking-[0] leading-[normal]">
                    Start date
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="absolute w-[14.9375rem] top-[1.6875rem] left-[1.375rem] font-medium text-[#777777] text-1rem tracking-[0] leading-[normal]"
                  />
                </div>
              </div>
              <div className="absolute w-[17rem] h-[3.5625rem] top-0 left-[17.4375rem]">
                <div className="w-[17rem] relative h-[3.5625rem] bg-white rounded-[2.8125rem] border border-solid border-[#a8a8a8]">
                  <div className="absolute w-[14.5625rem] top-[0.375rem] left-[1.3125rem] font-medium text-black text-[0.875rem] tracking-[0] leading-[normal]">
                    End date
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="absolute w-[14.9375rem] top-[1.6875rem] left-[1.375rem] font-medium text-[#777777] text-1rem tracking-[0] leading-[normal]"
                  />
                </div>
              </div>
              <button
                className="inline-flex items-center justify-center gap-[0.625rem] px-[8rem] py-[1rem] absolute top-0 left-[34.9375rem] w-[18rem] h-[3.5625rem] bg-black rounded-[2.8125rem] overflow-hidden border border-solid border-[#a8a8a8] relative w-fit mt-[-0.0625rem] font-medium text-[#ffffff] text-[1rem] tracking-[0] leading-[normal]"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4 mt-[2rem]">
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
                  <th className="px-4 py-3">Id</th>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Sub Category</th>
                  <th className="px-4 py-3">Composition</th>
                  <th className="px-4 py-3">Uses</th>
                  <th className="px-4 py-3">Side Effects</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Manufacturer</th>
                  <th className="px-4 py-3">Return Policy</th>
                  <th className="px-4 py-3">Directions</th>
                  <th className="px-4 py-3">Actions</th>
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
                      <td className="px-4 py-3">{product.Product_id}</td>
                      <td className="px-4 py-3">{product.Name}</td>
                      <td
                        className="px-4 py-3"
                        dangerouslySetInnerHTML={{
                          __html: `${product.Description.slice(0, 100)}${
                            product.Description.length > 100 ? "..." : ""
                          }`,
                        }}
                      ></td>
                      <td className="px-4 py-3">{product.Price}</td>
                      <td className="px-4 py-3">{product.Category}</td>
                      <td className="px-4 py-3">{product.Sub_Category}</td>
                      <td className="px-4 py-3">{product.Composition}</td>
                      <td className="px-4 py-3">{product.Uses}</td>
                      <td className="px-4 py-3">{product.Side_effects}</td>
                      <td className="px-4 py-3">
                        <img
                          src={product.Image_URL}
                          alt={product.Name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="px-4 py-3">{product.Manufacturer}</td>
                      <td className="px-4 py-3">{product.Return_Policy}</td>
                      <td className="px-4 py-3">{product.Directions_for_Use}</td>
                      <td className="px-4 py-3 flex gap-4">
                        <button
                          className="bg-black text-white px-4 py-2 rounded-full"
                          onClick={() => handleManageProduct(product)}
                        >
                          Manage
                        </button>
                        <button
                          className="bg-black text-white px-4 py-2 rounded-full"
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
                    <td colSpan="14" className="px-4 py-3 text-center">
                      No products found.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            <div className="flex justify-center mt-4">
              <button onClick={prevPage} className="mx-1 px-3 py-2 cursor-pointer">
                <IoIosArrowBack />
              </button>
              {Array.from(
                { length: Math.ceil(filteredProducts.length / itemsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    className={`mx-1 px-4 py-2 cursor-pointer ${
                      currentPage === i + 1 ? "border border-black rounded-full" : ""
                    }`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                )
              )}
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
