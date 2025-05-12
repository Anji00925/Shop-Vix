// AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // If you want to create a separate CSS for the dashboard

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-actions">
        <div className="dashboard-action">
          <Link to="/add-product" className="dashboard-link">
            <div className="action-card">
              <h3>Add Product</h3>
            </div>
          </Link>
        </div>

        <div className="dashboard-action">
          <Link to="/manage-products" className="dashboard-link">
            <div className="action-card">
              <h3>Manage Products</h3>
            </div>
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default AdminDashboard;
