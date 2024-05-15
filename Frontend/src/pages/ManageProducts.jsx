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
  const [loading, setLoading] = useState(true)
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState([]);
  const [productId, setProductId] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setLoading(false)
    // Fetch data from the API using environment variables
    axios
      .get(`${import.meta.env.VITE_NEXIBLE_URL}/product/All/1`, {
        headers: {
          "API-Key": import.meta.env.VITE_API_Key,
        },
      })
      .then((response) => {
        // Update the state with the fetched data
        setProducts(response.data.data);
        console.log("data", response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_NEXIBLE_URL}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_Key}`,
          },
        }
      );
      setProducts(response.data);
      console.log("Product deleted successfully:", id);
      // Remove the deleted product from the state
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem); // Moved inside the component

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
    setProductId(product.id);
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
                  <th className="px-4 py-3">Id</th>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Description</th>  
                  <th className="px-4 py-3">Product Price</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Product Image</th>
                  <th className="px-4 py-3">Valid_from</th>
                  <th className="px-4 py-3">Valid_till</th>
                  <th className="px-4 py-3">Keylineimage</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              {loading?(
                <Loading />
              ) : products ? (
                <tbody>
                  {currentProducts.map((products, index) => (
                    <tr
                      key={products.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } border-b`}
                    >
                      <td className="px-8 py-3">{products.id}</td>
                      <td className="px-8 py-3">{products.name}</td>
                      <td
                        className="px-8 py-3"
                        dangerouslySetInnerHTML={{
                          __html: `${products.description.slice(0, 100)}${
                            products.description.length > 100 ? "..." : ""
                          }`,
                        }}
                      ></td>

                      <td className="px-8 py-3">{products.price}</td>
                      <td className="px-8 py-3">{products.category}</td>
                      <td className="px-8 py-3">{products.qty}</td>
                      <td className="px-8 py-3">
                        <img
                          src={`/src/assets/${products.image}`}
                          alt={products.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="pl-8 py-3">{products.valid_from}</td>
                      <td className="pl-12 py-3">{products.valid_till}</td>
                      <td className="pl-12 py-3">
                        <a href={`/src/assets/${products.keylineimage}`} download>
                          {products.keylineimage}
                        </a>
                      </td>
                      <td className="px-8 py-3 flex gap-4">
                        <button
                          className="bg-black text-white px-4 py-2 rounded-full"
                          onClick={() => handleManageProduct(products)}
                        >
                          Manage
                        </button>
    
                    
                        <button
                          className="bg-black text-white px-4 py-2 rounded-full"
                          onClick={() => handleDeleteProduct(products.id)}
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
                    <td colSpan="11" className="px-4 py-3 text-center">
                      No products found.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>

            <div className="flex justify-center mt-4">
              <button
                onClick={prevPage}
                className="mx-1 px-3 py-2 cursor-pointer"
              >
                <IoIosArrowBack />
              </button>
              {Array.from(
                { length: Math.ceil(products.length / itemsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    className={`mx-1 px-4 py-2 cursor-pointer ${
                      currentPage === i + 1
                        ? "border border-black rounded-full"
                        : ""
                    }`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                onClick={nextPage}
                className="mx-1 px-3 py-2 cursor-pointer"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>

      {/* Modal for adding a new product */}
      <AddProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        newProduct={newProduct}
    
      />
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
