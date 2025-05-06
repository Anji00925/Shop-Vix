// import React, { useEffect, useState } from "react";
// import axios from "axios";


// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Replace with your actual backend URL
//     axios.get("http://localhost:5000/api/products")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Product List</h2>
//       <div className="row">
//         {products.map((product) => (
//           <div key={product._id} className="col-md-4 mb-4">
//             <div className="card">
//               <img src={product.image} className="card-img-top" alt={product.name} />
//               <div className="card-body">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="card-text">{product.description}</p>
//                 <p className="card-text"><strong>${product.price}</strong></p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import './ProductList.css'; // You can create this file for your custom styling

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState("");  // Error state

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching products.");
        setLoading(false);
        console.error("Error fetching products:", error);
      });
  }, []);

  // Handle image loading issues (fallback image if broken)
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150";  // Placeholder image on error
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                onError={handleImageError}  // Fallback for broken images
              />
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
