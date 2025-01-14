import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./Components/LoginPage/LoginPage";

const GOOGLE_CLIENT_ID =
  "45441104414-uuhc5duoik47pctlr21vj5sn0q9h9jb3.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LoginPage />
    </GoogleOAuthProvider>
  );
}

export default App;
