import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', description: '', image: '', category: '' });

  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      alert('Error fetching products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  const startEdit = (product) => {
    setEditId(product._id);
    setEditForm({ ...product });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${editId}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      alert('Error updating product');
    }
  };

  return (
    <div className="container">
      <h2>Manage Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-card">
            {editId === product._id ? (
              <form onSubmit={submitEdit}>
                <input name="name" value={editForm.name} onChange={handleEditChange} required />
                <input name="price" value={editForm.price} onChange={handleEditChange} required />
                <input name="description" value={editForm.description} onChange={handleEditChange} required />
                <input name="image" value={editForm.image} onChange={handleEditChange} required />
                <input name="category" value={editForm.category} onChange={handleEditChange} required />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <p>{product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <button onClick={() => startEdit(product)}>Edit</button>
                <button onClick={() => deleteProduct(product._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
