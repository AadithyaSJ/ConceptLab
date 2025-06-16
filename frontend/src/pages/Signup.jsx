import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import illustration from '/boy2.png'; // Replace with your 3D image

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Signed up with email: ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-16">
      {/* Left Section (Form) */}
      <div className="md:w-1/2 w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-yellow-400 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Sign up
        </h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold py-3 rounded-lg hover:scale-[1.02] transition-transform"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Right Section (Info + Image) */}
      <div className="md:w-1/2 w-full flex flex-col items-start md:items-center justify-center text-white mt-12 md:mt-0 md:pl-12 space-y-6">
        <h1 className="text-4xl font-bold">
          Join <span className="text-yellow-300">ConceptLab</span>
        </h1>
        <p className="text-white/80 text-lg max-w-md">
          Start your visual learning journey into law and concepts.
        </p>
        <img
          src={illustration}
          alt="Illustration"
          className="w-64 md:w-80 drop-shadow-xl"
        />
        <p className="text-sm text-white/60">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-300 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
