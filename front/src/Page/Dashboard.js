import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../Component/ProductForm";
import DeletePrompt from "../Component/DeletePrompt";
import Filter from "../Component/Filter";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {RiAddCircleFill, RiEdit2Fill, RiDeleteBin5Fill  } from "react-icons/ri";


export default function Dashboard() {
    //PRODUCT DATA
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
    //LOADING AND ERROR SCREEN
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
    //MODALS
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //FOR EDIT PRODUCT
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  //PRODUCT ID FOR DELETION
  const [selectedId, setSelectedId] = useState(null);
  //CATEGORIES FOR THE FILTER
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); // Initialize filteredProducts
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //ADD
  const handleAdd = () => {
    setIsEdit(false);
    setShowModal(true);
  };

  //EDIT
  const handleEdit = (product) => {
    setIsEdit(true);
    setSelectedProduct(product);
    setShowModal(true);
  };

  //FETCHING THE PRODUCTS AGAIN AFTER ADDING OR EDITING
  const handleProductSaved = () => {
    setLoading(true);
    setError(null);

    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products:", error);
        setError("Failed to load products.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //DELETE MODAL SHOW AND SET THE ID
  const handleDelete = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  //CONFIRMATION OF DELETION
  const confirmDelete = async () => {
    setLoading(true); // Set loading to true while fetching data
    setError(null); // Reset any previous errors

    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${selectedId}`);
      setProducts(products.filter((product) => product.id !== selectedId));
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== selectedId)
      );
      console.log("Successfully Deleted!");
    } catch (error) {
      console.error("There was an error deleting the product:", error);
      setError("Failed to delete product.");
    } finally {
      setLoading(false);
    }
    setShowDeleteModal(false);
  };

  //LOADING AND ERROR SCREEN
  if (loading) {
    return <div className="loadingScreen">Loading...</div>;
  }

  if (error) {
    return <div className="errorScreen">{error}</div>;
  }

  // SEARCH & FILTER
  const handleSearch = (searchTerm, selectedCategories, minPrice, maxPrice) => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Convert minPrice and maxPrice to numbers, and filter by price range
    if (minPrice !== '') {
      const minPriceNum = parseFloat(minPrice);  // Convert to number
      filtered = filtered.filter((product) => product.price >= minPriceNum);
    }

    if (maxPrice !== '') {
      const maxPriceNum = parseFloat(maxPrice);  // Convert to number
      filtered = filtered.filter((product) => product.price <= maxPriceNum);
    }

    setFilteredProducts(filtered); // Update filtered products
  };


  return (
    <>
      
<div className="dashboard">
  <aside className="searchFilter">
    {/* Pass the handleSearch function to Filter */}
    <Filter onSearch={handleSearch} categories={uniqueCategories} />
  </aside>

  <div className="view">
    <h1 className="dashboard-title">Dashboard</h1>
    <Button className="addButton" onClick={handleAdd} variant="primary">
      <RiAddCircleFill /> Add Product
    </Button>

    <Table striped responsive className="product-table">
      <thead>
        <tr>
          <th>Barcode</th>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.barcode}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <div className="action-buttons">
                  <Button
                    className="action-button editButton"
                    onClick={() => handleEdit(product)}
                    variant="outline-primary"
                    title="Edit Product"
                  >
                    <RiEdit2Fill />
                  </Button>

                  <Button
                    className="action-button deleteButton"
                    onClick={() => handleDelete(product.id)}
                    variant="outline-danger"
                    title="Delete Product"
                  >
                    <RiDeleteBin5Fill />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No products found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
</div>

{/* MODAL FOR ADD AND EDIT PRODUCT */}
<ProductForm
  show={showModal}
  handleClose={() => setShowModal(false)}
  isEdit={isEdit}
  selectedProduct={selectedProduct}
  onProductSaved={handleProductSaved}
/>

{/* MODAL FOR DELETE */}
<DeletePrompt
  show={showDeleteModal}
  handleClose={() => setShowDeleteModal(false)}
  confirmDelete={confirmDelete}
/>

    </>
  );
}
