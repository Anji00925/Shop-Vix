// // server.js
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const express = require('express');
// const authRoutes = require("./routes/auth");
// const cors = require('cors');
// const productRoutes = require('./routes/productRoutes');

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/api/auth", authRoutes);

// // Use product routes
// app.use('/api/products', productRoutes);

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });

// // Test route
// app.get('/', (req, res) => res.send('API is running...'));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const authRoutes = require("./routes/auth");
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://shop-vix.vercel.app/', // Replace with your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));  // Apply the CORS settings

app.use(express.json());
app.use("/api/auth", authRoutes);

// Use product routes
app.use('/api/products', productRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => res.send('API is running...'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
