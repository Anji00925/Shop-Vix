import React, { useEffect, useState } from "react";
import axios from "axios";


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace with your actual backend URL
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>${product.price}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
