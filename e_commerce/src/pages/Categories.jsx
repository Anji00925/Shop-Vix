// import React from "react";
// import { Link } from "react-router-dom";
// import './Categories.css'
// const Categories = () => {
//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Shop by Category</h2>
//       <div className="row">
//         <div className="col-md-3">
//           <Link to="/category/sports" className="category-card">
//             <h5>Sports</h5>
//           </Link>
//         </div>
//         <div className="col-md-3">
//           <Link to="/category/electronics" className="category-card">
//             <h5>Electronics</h5>
//           </Link>
//         </div>
//         <div className="col-md-3">
//           <Link to="/category/clothing" className="category-card">
//             <h5>Clothing</h5>
//           </Link>
//         </div>
//         <div className="col-md-3">
//           <Link to="/category/home-appliances" className="category-card">
//             <h5>Home Appliances</h5>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch all products to get their categories
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        const products = response.data;
        const uniqueCategories = [
          ...new Set(products.map((product) => product.category)),
        ];  // Extract unique categories
        setCategories(uniqueCategories);  // Set unique categories in state
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Shop by Category</h2>
      <div className="row">
        {categories.map((category) => (
          <div key={category} className="col-md-3">
            <Link to={`/category/${category}`} className="category-card">
              <h5>{category}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
