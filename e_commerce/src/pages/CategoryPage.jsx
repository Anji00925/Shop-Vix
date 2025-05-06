
// import React from "react";
// import { useParams } from "react-router-dom";

// const CategoryPage = () => {
//   const { categoryName } = useParams();

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">{categoryName.toUpperCase()}</h2>
      
//       {/* Add products listing here */}
//     </div>
//   );
// };

// export default CategoryPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const { categoryName } = useParams(); // 'sports', 'electronics', etc.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products?category=${categoryName}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products by category", err);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="container">
      <h2>Products in {categoryName}</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-3">
            <div className="card">
              <img src={product.image} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5>{product.name}</h5>
                <p>₹{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
