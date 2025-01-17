
import React, { useState } from "react";
import "./ForgotPasswordPage.css"; // Ensure you add this CSS file for styling

const ForgotPasswordPage = () => {
  const [message, setMessage] = useState("");

  const handleResetLink = () => {
    setMessage("Sent an email to reset your password!");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Forgot Password</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="email" placeholder="Enter your email" required />
        </div>
      </div>
      <div className="submit-container">
        <button className="submit" onClick={handleResetLink}>
          Send Reset Link
        </button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ForgotPasswordPage;
