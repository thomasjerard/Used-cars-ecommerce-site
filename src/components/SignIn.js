import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../Firebase';
import '../css/SignIn.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate('');

  const signIn = (e) => {
    e.preventDefault();
    setError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/buycars');
      })
      .catch((error) => {
        setError('Invalid email or password. Please try again.');
        console.log(error);
      });
  };

  return (
    <div className="box1">
      <div className="box">
        <span className="borderLine"></span>
        <form onSubmit={signIn}>
          <h2>Sign In</h2>
          <div className="inputBox">
            <input
              type="email"
              required="required"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              required="required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="links">
            <a href="/signup">Don't have an account? Sign Up</a>
          </div>
          <input type="submit" value="Login" />
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;