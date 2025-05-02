// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Simulate authentication (Replace with API call in real app)
//     if (email === "anji33@gmail.com" && password === "Anji 2533") {
//       localStorage.setItem("user", JSON.stringify({ email })); // Store user in localStorage
//       navigate("/"); // Redirect to home page after login
//     } else {
//       alert("Invalid email or password!");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign In</h2>
//       <form onSubmit={handleSubmit}>
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
//         <button type="submit">Sign In</button>
//       </form>
//       <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For capturing error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Clear previous errors

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });

      console.log("Login success:", response.data);

      // Store user data or token in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to home or dashboard after successful login
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Error display */}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
