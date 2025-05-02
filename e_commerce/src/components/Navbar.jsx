// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css"; // Custom styling (optional)
// import { FaShoppingCart } from "react-icons/fa"; // Cart icon

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container">
//         {/* Brand Name / Logo */}
//         <Link className="navbar-brand" to="/">
//           <strong>Shopvix</strong>
//         </Link>

//         {/* Toggle Button for Mobile */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Links */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav mx-auto">
//             <li className="nav-item">
//               <Link className="nav-link active" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/Products">Shop</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/categories">Categories</Link>
//             </li>
//           </ul>

//           {/* Search Bar */}
//           {/* <form className="d-flex">
//             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//             <button className="btn btn-outline-light" type="submit">Search</button>
//           </form> */}

//           {/* Cart Icon */}
//           <Link to="/cart" className="btn btn-light ms-3">
//             <FaShoppingCart /> <span className="badge bg-danger">3</span>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Custom styling (optional)
import { FaShoppingCart } from "react-icons/fa"; // Cart icon

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/signin"); // Redirect to Sign In page
  };

  const handleShopClick = (e) => {
    if (!user) {
      e.preventDefault(); // Prevent navigation
      alert("You must sign in first!"); // Show alert
      navigate("/signin"); // Redirect to Sign In page
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Brand Name / Logo */}
        <Link className="navbar-brand" to="/">
          <strong>Shopvix</strong>
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" onClick={handleShopClick}>Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Categories</Link>
            </li>
          </ul>

          {/* Auth Links */}
          {user ? (
            
            <button onClick={handleLogout} className="btn btn-outline-light me-2">Logout</button>
          ) : (
            <div className="d-flex">
              <Link to="/signin" className="btn btn-outline-light me-2">Sign In</Link>
              <Link to="/signup" className="btn btn-light">Sign Up</Link>
            </div>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="btn btn-light ms-3">
            <FaShoppingCart /> <span className="badge bg-danger">3</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

