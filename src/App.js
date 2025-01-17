import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./Components/LoginPage/LoginPage";
import ForgotPasswordPage from "./Components/ForgotPasswordPage/ForgotPasswordPage";

const GOOGLE_CLIENT_ID =
  "45441104414-uuhc5duoik47pctlr21vj5sn0q9h9jb3.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

