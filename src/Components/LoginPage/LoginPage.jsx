import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./LoginPage.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const LoginPage = () => {
  const [action, setAction] = useState("Sign Up");

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    alert("Login successful!");
  };

  const handleLoginFailure = () => {
    alert("Login failed. Please try again.");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email Id" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      {action === "Sign Up" ? null : (
        <div className="forgot-password">
          Forgot password? <span>Click Here!</span>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>

      {/* Google Login Button */}
      <div className="google-login">
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
      </div>
    </div>
  );
};

export default LoginPage;
