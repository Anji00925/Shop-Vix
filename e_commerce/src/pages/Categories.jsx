import React from "react";
import { Link } from "react-router-dom";
import './Categories.css'
const Categories = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Shop by Category</h2>
      <div className="row">
        <div className="col-md-3">
          <Link to="/category/sports" className="category-card">
            <h5>Sports</h5>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/category/electronics" className="category-card">
            <h5>Electronics</h5>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/category/clothing" className="category-card">
            <h5>Clothing</h5>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/category/home-appliances" className="category-card">
            <h5>Home Appliances</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
