
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import "./LoginPage.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const LoginPage = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    alert("Login successful!");
  };

  const handleLoginFailure = () => {
    alert("Login failed. Please try again.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    if (formData.name && formData.email && formData.password) {
      try {
        await axios.post("http://localhost:5000/signup", formData);
        alert(`Created your account, ${formData.name}!`);
        setFormData({ name: "", email: "", password: "" }); // Clear form
        setAction("Login"); // Switch back to Login page
      } catch (error) {
        alert("Sign up failed. Please try again.");
        console.error(error);
      }
    } else {
      alert("Please fill in all fields to create your account.");
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });
      alert("Login successful!"); // Show success message
    } catch (error) {
      alert("Login failed. Please try again.");
      console.error(error);
    }
  };
  
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            name="email"
            placeholder="Email Id"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>
      {action === "Login" && (
        <div className="forgot-password">
          Forgot password? <Link to="/forgot-password">Click Here!</Link>
        </div>
      )}
      <div className="submit-container">
        {action === "Sign Up" ? (
          <div className="submit" onClick={handleSignUp}>
            Create Account
          </div>
        ) : (
          <div
            className="submit"
            onClick={handleLogin}
          >
            Login 
          </div>
        )}
      </div>

      <div className="google-login">
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
      </div>

      <div className="signup-prompt">
        {action === "Login" ? (
          <>
            Don't have an account? <span onClick={() => setAction("Sign Up")}>Sign up</span>
          </>
        ) : (
          <>
            Already have an account? <span onClick={() => setAction("Login")}>Login</span>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

