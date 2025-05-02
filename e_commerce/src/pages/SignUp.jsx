// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Save user details in localStorage
//     localStorage.setItem("user", JSON.stringify({ name, email }));

//     console.log("User Signed Up:", { name, email });
//     navigate("/products"); // Redirect to Products page after signing up
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>Already have an account? <Link to="/signin">Sign In</Link></p>
//     </div>
//   );
// };

// export default SignUp;

// ######################################################################################################

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Auth.css";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // For capturing error messages
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError(""); // Clear previous errors

//     if (!name || !email || !password) {
//       setError("All fields are required.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/signup", {
//         name,
//         email,
//         password,
//       });

//       console.log("Signup success:", response.data);

//       // Store user details/token in localStorage
//       localStorage.setItem("user", JSON.stringify({ name, email }));
      
//       // Redirect to products page after successful signup
//       navigate("/products");
//     } catch (err) {
//       console.error("Signup failed:", err.response?.data?.message || err.message);
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       {error && <p className="error-message">{error}</p>} {/* Error display */}
//       <p>
//         Already have an account? <Link to="/signin">Sign In</Link>
//       </p>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For capturing error messages
  const [success, setSuccess] = useState(""); // For capturing success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name: name.trim(), // Trim spaces
        email: email.trim(), // Trim spaces
        password: password.trim(), // Trim spaces
      });

      console.log("Signup success:", response.data);

      // Store user details/token in localStorage (if the backend sends a token)
      localStorage.setItem("user", JSON.stringify({ name, email }));
      // Optionally, if backend returns token, store it as well
      // localStorage.setItem("token", response.data.token);

      // Show success message before redirect
      setSuccess("User created successfully!");

      // Redirect to products page after successful signup
      setTimeout(() => {
        navigate("/products");
      }, 1500); // Delay to show success message before redirect
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {success && <p className="success-message">{success}</p>} {/* Success message */}
      {error && <p className="error-message">{error}</p>} {/* Error display */}

      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
