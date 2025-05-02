// backend/models/Product.js
const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product; // Export the model
