
// import React, { useState } from "react";
// import "./ForgotPasswordPage.css"; // Ensure you add this CSS file for styling

// const ForgotPasswordPage = () => {
//   const [message, setMessage] = useState("");

//   const handleResetLink = () => {
//     setMessage("Sent an email to reset your password!");
//   };

//   return (
//     <div className="container">
//       <div className="header">
//         <div className="text">Forgot Password</div>
//         <div className="underline"></div>
//       </div>
//       <div className="inputs">
//         <div className="input">
//           <input type="email" placeholder="Enter your email" required />
//         </div>
//       </div>
//       <div className="submit-container">
//         <button className="submit" onClick={handleResetLink}>
//           Send Reset Link
//         </button>
//       </div>
//       {message && <div className="message">{message}</div>}
//     </div>
//   );
// };

// export default ForgotPasswordPage;

import React, { useState } from "react";
import axios from "axios"; // Add Axios for API requests
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetLink = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-reset-email", {
        email,
      });
      setMessage(response.data); // Display success message
    } catch (error) {
      setMessage("Failed to send email. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Forgot Password</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
