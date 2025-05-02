// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// // Signup
// router.post("/signup", async (req, res) => {
//     console.log('SignIn Route Hit');
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User created successfully" });
//   } catch (err) {
//     console.error("Signup Error:", err.message);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// // Login
// router.post("/signin", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (!existingUser)
//       return res.status(404).json({ message: "User not found" });

//     const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//     if (!isPasswordCorrect)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: existingUser._id }, "secretkey", { expiresIn: "1h" });

//     // Remove password before sending user data
//     const { password: _, ...userWithoutPassword } = existingUser.toObject();

//     res.status(200).json({ token, user: userWithoutPassword });
//   } catch (err) {
//     console.error("Login Error:", err.message);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  console.log('Signup Route Hit'); // Debugging line to ensure the route is hit
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err.message); // Log the error message
    res.status(500).json({ message: "Something went wrong during signup" });
  }
});

// Login
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, "secretkey", { expiresIn: "1h" });

    // Remove password before sending user data
    const { password: _, ...userWithoutPassword } = existingUser.toObject();

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error("Login Error:", err.message); // Log the error message
    res.status(500).json({ message: "Something went wrong during login" });
  }
});

module.exports = router;
