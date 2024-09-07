import React from 'react';
import './Navbar.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = "834164604376-rcvmm7j3cffgsldqtfl22df7m108h3ft.apps.googleusercontent.com";

const onSuccess = (response) => {
  console.log('Success:', response);

  // Extract the credential (idToken) from the response
  const idToken = response.credential;
  console.log(idToken);
  

  // Send the ID token to the backend for verification
  fetch('https://localhost:7021/api/GoogleSignIn/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "idToken": idToken }),  // Ensure body is a JSON string
  })
    .then(res => res.json())
    .then(data => console.log("Server Response:", data))
    .catch(err => console.error("Error:", err));
};

const onError = () => {
  console.error('Login Failed');
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">MyLogo</a>
      </div>
      <ul className="navbar-links">
        <GoogleOAuthProvider clientId={clientId}>
          <div>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
            />
          </div>
        </GoogleOAuthProvider>
      </ul>
    </nav>
  );
}

export default Navbar
