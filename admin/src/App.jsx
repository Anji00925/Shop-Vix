import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AddProduct from './AddProduct';
import ManageProducts from './ManageProducts';
import AddProductForm from './AddProductForm';
import './Admin.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/admin/add-product" element={<AddProductForm />} /> 
        <Route path="/manage-products" element={<ManageProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
