import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import illustration from '/boy2.png';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: username });

      // Save additional user info to Firestore
      await setDoc(doc(db, 'users', userCred.user.uid), {
        name: username,
        email,
        dob,
        uid: userCred.user.uid,
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err.message);
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);

      // If user data doesn't exist or missing DOB, redirect to profile completion
      if (!userSnap.exists() || !userSnap.data().dob) {
        await setDoc(userRef, {
          name: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid,
          dob: "", // ask later
        });
        navigate('/complete-profile');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Google Sign-In error:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-16">
      {/* Left Section (Form) */}
      <div className="md:w-1/2 w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-yellow-400 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Sign up</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
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
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          {error && (
            <div className="text-red-400 text-sm bg-red-900/30 rounded-md p-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold py-3 rounded-lg hover:scale-[1.02] transition-transform"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-white/20" />
          <span className="mx-4 text-sm text-white/50">or</span>
          <div className="flex-grow h-px bg-white/20" />
        </div>

        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-3 rounded-lg hover:scale-[1.02] transition-transform"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google icon"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>

      {/* Right Section */}
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
          <Link to="/login" className="text-yellow-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
