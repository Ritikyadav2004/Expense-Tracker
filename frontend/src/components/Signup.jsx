import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/expenseService';

const Signup = () => {
  //  To track the Inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // After Signed Up Redirected towards login

  /**
   * Handles user registration form submission to the backend.
   * @param {Object} e - The form submission event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent browser refresh

    try {
      await registerUser({ name: username, email, password });
      alert("Account Created successfully!");
      navigate('/login');
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.message || "Registration failed!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      {/* Bootstrap Card Wrapper */}
      <div className="card p-4 shadow-sm" style={{ width: '22rem', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 text-slate-800 font-bold">Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
          {/* full Name field */}
          <div className="mb-3">
            <label className="form-label font-semibold text-slate-600">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          {/* email field */}
          <div className="mb-3">
            <label className="form-label font-semibold text-slate-600">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          {/* password field */}
          <div className="mb-3">
            <label className="form-label font-semibold text-slate-600">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {/* signup Button */}
          <button type="submit" className="btn btn-primary w-100 mb-3 bg-indigo-600 border-none hover:bg-indigo-700">
            Sign Up
          </button>
        </form>

        {/* link to Login page */}
        <div className="text-center">
          <span className="text-slate-500 text-sm">Already have an account? </span>
          <Link to="/login" className="text-indigo-600 text-sm font-semibold text-decoration-none">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;