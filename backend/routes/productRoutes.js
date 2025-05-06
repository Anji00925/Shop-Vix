// // backend/routes/productRoutes.js

// const express = require('express');
// const Product = require('../models/Product'); // Import the Product model

// const router = express.Router();

// // Define the getProducts function (or import from controllers if needed)
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();  // Fetch all products
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Define the getProductById function (or import from controllers if needed)
// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id); // Find product by ID
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Define routes
// router.get('/', getProducts);  // GET /api/products
// router.get('/:id', getProductById);  // GET /api/products/:id

// // POST /api/products
// router.post('/', async (req, res) => {
//   const { name, price, description,image } = req.body;

//   const newProduct = new Product({
//     name,
//     price,
//     description,
//     image,
//   });

//   try {
//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct); // Return the saved product
//   } catch (error) {
//     res.status(400).json({ message: error.message }); // Error handling
//   }
// });

// // PUT /api/products/:id
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(updatedProduct); // Return the updated product
//   } catch (error) {
//     res.status(400).json({ message: error.message }); // Error handling
//   }
// });

// // DELETE /api/products/:id
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message }); // Error handling
//   }
// });

// module.exports = router; // Ensure this exports the router correctly

const express = require('express');
const Product = require('../models/Product'); // Import the Product model

const router = express.Router();

// Define the getProducts function (with category filter)
const getProducts = async (req, res) => {
  const { category } = req.query;  // Get category from query parameters
  
  try {
    const filter = category ? { category } : {};  // If category is provided, filter by it
    const products = await Product.find(filter);  // Fetch products with the filter
    res.json(products);  // Return filtered products
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Define the getProductById function (or import from controllers if needed)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Define routes
router.get('/', getProducts);  // GET /api/products with optional category filter
router.get('/:id', getProductById);  // GET /api/products/:id

// POST /api/products
router.post('/', async (req, res) => {
  const { name, price, description, image, category } = req.body;

  const newProduct = new Product({
    name,
    price,
    description,
    image,
    category,  // Ensure category is included when adding a product
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); // Return the saved product
  } catch (error) {
    res.status(400).json({ message: error.message }); // Error handling
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct); // Return the updated product
  } catch (error) {
    res.status(400).json({ message: error.message }); // Error handling
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message }); // Error handling
  }
});

module.exports = router; // Ensure this exports the router correctly
