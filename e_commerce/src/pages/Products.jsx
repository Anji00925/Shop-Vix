// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Products.css";

// const products = [
//   { id: 1, name: "Smartphone", price: 50000, image: "/images/iqooneo10r.jpg" },
//   { id: 2, name: "Laptop", price: 999, image: "/images/product2.jpg" },
//   { id: 3, name: "Headphones", price: 199, image: "/images/product3.jpg" },
//   { id: 4, name: "Smartwatch", price: 299, image: "/images/product4.jpg" },
//   { id: 5, name: "Camera", price: 499, image: "/images/product5.jpg" },
// ];

// const Products = ({ addToCart }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       alert("You must be logged in to access this page!");
//       navigate("/signin");
//     }
//   }, [navigate]);

//   return (
//     <div className="products-container">
//       <h2 className="text-center">Our Products</h2>
//       <div className="product-grid">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <img src={product.image} alt={product.name} className="product-image" />
//             <div className="product-info">
//               <h3>{product.name}</h3>
//               <p className="product-price">₹{product.price}</p>
//               <button onClick={() => addToCart(product)} className="btn btn-success">Add to Cart</button>
//               <Link to={`/products/${product.id}`} className="btn btn-primary">View Details</Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("You must be logged in to access this page!");
      navigate("/signin");
    }

    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products."); // Set error message
        setLoading(false); // Set loading to false when there is an error
      }
    };

    fetchProducts();
  }, [navigate]);

  if (loading) {
    return <div>Loading products...</div>; // Display loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div className="products-container">
      <h2 className="text-center">Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button onClick={() => addToCart(product)} className="btn btn-success">
                Add to Cart
              </button>
              <Link to={`/products/${product._id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
