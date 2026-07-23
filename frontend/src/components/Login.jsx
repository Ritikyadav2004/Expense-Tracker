import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { loginUser } from '../services/expenseService';

const Login = () => {
  //  To track the Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // to navigate the user After Logged in 
  const { setUser } = useContext(UserContext) || { setUser: () => {} };  // extracting out setUser
  
  /**
   * Handles submission of the login credentials to authenticate the user.
   * @param {Object} e - The form submission event
   */
  const  handleSubmit = async (e) => {
    e.preventDefault(); // tp prevent from browser refreash
    
    try {
      const data = await loginUser({ email, password });
      alert("Logged in successfully!");
      console.log("Logged In User Details:", data.user);

      // Save user details to persist session on page reload
      localStorage.setItem('user', JSON.stringify(data.user)); // Local storage me save kiya
      setUser(data.user); // Update global UserContext state
      navigate('/dashboard'); // 
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message || "Something went wrong during login!");
    }
  
    }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      
      <div className="card p-4 shadow-sm" style={{ width: '22rem', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 text-slate-800 font-bold">Login</h2>
        
        <form onSubmit={handleSubmit}>
          {/* email input field */}
          <div className="mb-3">
            <label className="form-label font-semibold text-slate-600">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // State update on change
              required 
            />
          </div>

          {/* Password input field */}
          <div className="mb-3">
            <label className="form-label font-semibold text-slate-600">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // State update on change
              required 
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 mb-3 bg-indigo-600 border-none hover:bg-indigo-700">
            Login
          </button>
        </form>

        {/* Link to Signup page */}
        <div className="text-center">
          <span className="text-slate-500 text-sm">Don't have an account? </span>
          <Link to="/signup" className="text-indigo-600 text-sm font-semibold text-decoration-none">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;