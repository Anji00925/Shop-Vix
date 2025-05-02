import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the new styles

const Home = () => {
  return (
    <div className="container mt-4">
      
      {/* Hero Section */}
      <div className="jumbotron section-card">
        <h1 className="display-4">Welcome to Shopvix</h1>
        <p className="lead">Discover a modern shopping experience like no other.</p>
        <Link to="/products" className="btn btn-light btn-lg">Start Shopping</Link>
      </div>

      {/* Featured Products */}
      <section className="section-card">
  <h2 className="text-center">Featured Products</h2>
  <div className="row">
    {[
      { id: 1, img: "https://in-exstatic-vivofs.iqoo.com/jCRQLfkJ0cXr10qJ/1653909982630/228331e88a474d8221cae3b385a0e1c4.png", price: "₹26,999 " },
      { id: 2, img: "https://cdn1.smartprix.com/rx-isbcLs6Ze-w1200-h1200/sbcLs6Ze.jpg", price: "₹55000" },
      { id: 3, img: "https://www.yangcanggih.com/wp-content/uploads/2023/03/Photo-2-vivo-V27-5G.jpg", price: "₹20000" },
    ].map((product) => (
      <div className="col-md-4" key={product.id}>
        <div className="card">
          <img src={product.img} className="card-img-top" alt={`Product ${product.id}`} />
          <div className="card-body">
            <h5 className="card-title">Product {product.id}</h5>
            <p className="card-text">{product.price}</p>
            <Link to={`/products/${product.id}`} className="btn btn-outline-primary">View Details</Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Categories Section */}
      {/* Categories Section */}
<section className="section-card">
  <h2 className="text-center">Shop by Category</h2>
  <div className="row">
    {["Electronics", "Clothing", "Accessories", "Home Appliances"].map((category, index) => (
      <div className="col-md-3" key={index}>
        <Link to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`} className="category-card">
          <h5>{category}</h5>
          <button className="btn btn-sm btn-outline-dark">View</button>
        </Link>
      </div>
    ))}
  </div>
</section>


    </div>
  );
};

export default Home;
