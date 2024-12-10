import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Component/Header";
import Filter from "../Component/Filter";
import ProductCard from "../Component/ProductCard";
import { Link } from "react-router-dom"; // Import Link for cart navigation
import { GiShoppingCart } from "react-icons/gi"; // Shopping cart icon

export default function Main() {
  // Handle the data of the product
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handles the errors
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Categories for the filter
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); // Initialize filteredProducts
      } catch (err) {
        setError("A problem occurs while fetching data from the database");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show loading and error screens
  if (loading) {
    return <div className="loadingScreen">Loading...</div>;
  }

  if (error) {
    return <div className="errorScreen">{error}</div>;
  }

  // Handle search and filtering
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
    <div className="main-container">
      <Header />
      
      <div className="content-container">
        {/* Cart Icon */}
        <Link to="/cart" className="cart-link">
          <GiShoppingCart className="cart-icon" />
        </Link>
        
        <div className="main">
          <aside className="searchFilter">
            {/* Pass the handleSearch function to Filter */}
            <Filter onSearch={handleSearch} categories={uniqueCategories} />
          </aside>

          <div className="product-list-container">
            {/* Render filtered products */}
            <div className="product-list">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <h1>No products found</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
