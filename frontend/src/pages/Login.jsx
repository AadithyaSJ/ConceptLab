import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust if needed
import illustration from '/BOY.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-16">
      {/* Left Section */}
      <div className="md:w-1/2 w-full flex flex-col items-start justify-center text-white space-y-6 mb-12 md:mb-0">
        <h1 className="text-4xl font-bold">
          Login to <span className="text-yellow-300">ConceptLab</span>
        </h1>
        <p className="text-white/80 text-lg">
          Learn Science concepts the fun and visual way.
        </p>
        <img
          src={illustration}
          alt="Illustration"
          className="w-64 md:w-80 mt-4 drop-shadow-xl"
        />
        <p className="text-sm text-white/60">
          Don’t have an account?
          <Link to="/signup" className="text-yellow-300 ml-1 hover:underline">
            Register here!
          </Link>
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full max-w-md bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-yellow-400 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="flex justify-end text-sm text-white/50">
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/30 rounded-md p-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold py-3 rounded-lg hover:scale-[1.02] transition-transform"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center justify-center text-white/50 text-sm">
          <span className="border-t border-white/30 w-full mr-3"></span>
          or
          <span className="border-t border-white/30 w-full ml-3"></span>
        </div>

        {/* Only Google Login */}
        <div className="flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="bg-white/10 p-2 rounded-full border border-white/30 hover:scale-105 transition"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
