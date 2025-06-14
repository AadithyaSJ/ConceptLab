// src/pages/Signup.jsx
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <input type="text" placeholder="Username (optional)" />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Signup;
