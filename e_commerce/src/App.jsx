// import React, { useState } from "react";
// import { Route, Routes } from "react-router-dom"; // ❌ Removed extra <Router>
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Products from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import Categories from "./pages/Categories";
// import CategoryPage from "./pages/CategoryPage";
// import Cart from "./pages/Cart";
// import ProductList from "./components/ProductList";

// function App() {
//   const [cartItems, setCartItems] = useState([]); // ✅ Manage cart state

//   // ✅ Function to add item to cart
//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const itemExists = prevItems.find((item) => item.id === product.id);
//       if (itemExists) {
//         return prevItems.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prevItems, { ...product, quantity: 1 }];
//     });
//   };

//   // ✅ Function to remove item from cart
//   const removeFromCart = (id) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

//   // ✅ Function to update item quantity
//   const updateQuantity = (id, quantity) => {
//     setCartItems(
//       cartItems.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
//       )
//     );
//   };

//   return (
//     <div className="container text-center mt-5">
//       <Navbar />
//       {/* <ProductList /> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/products" element={<Products addToCart={addToCart} />} /> {/* ✅ Pass addToCart */}
//         <Route path="/products/:id" element={<ProductDetails />} />
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/category/:categoryName" element={<CategoryPage />} />
//         <Route path="/productlist" element={<ProductList />} />
//         <Route
//           path="/cart"
//           element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import ProductList from "./components/ProductList";

// import AdminDashboard from "./admin/AdminDashboard";
// import AddProduct from "./admin/AddProduct";
// import ManageProducts from "./admin/ManageProducts";
// import AdminRoute from "./admin/AdminRoute";

import axios from "axios";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <div className="container text-center mt-5">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path="/productlist" element={<ProductList />} />

        
        {/* <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/add" element={<AdminRoute><AddProduct /></AdminRoute>} />
        <Route path="/admin/manage" element={<AdminRoute><ManageProducts /></AdminRoute>} /> */}
      </Routes>
    </div>
  );
}

export default App;
