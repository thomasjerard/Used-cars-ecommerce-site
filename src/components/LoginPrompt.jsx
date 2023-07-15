import React from 'react';
import '../css/LoginPrompt.css';

const LoginPrompt = () => {
// function LoginPrompt() {
  return (
    <div className="text-center LoginPrompt">
      <p>Please log in to continue.</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" className="btn btn-primary me-sm-2">Login</button>
        <button type="button" className="btn btn-outline-secondary">Register</button>
      </div>
    </div>
  );
}

export default LoginPrompt;
