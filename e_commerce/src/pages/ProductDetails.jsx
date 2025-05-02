import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";


const ProductDetails = () => {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="product-details-container">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: "300px" }} />
      <p className="mt-3"><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
    </div>
  );
};

export default ProductDetails;
