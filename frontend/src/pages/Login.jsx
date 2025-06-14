import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, just log values
    console.log('Email:', email);
    console.log('Password:', password);
    alert(`Logged in with email: ${email}`);
  };

  const handleGoogleLogin = () => {
    alert("Pretend this logs in with Google 😄");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin} className="google-button">
        Login with Google
      </button>
      <p>Don’t have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}

export default Login;
