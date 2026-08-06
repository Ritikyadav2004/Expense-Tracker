import React, { useState, useContext } from 'react';
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { loginUser } from '../services/expenseService';

const Login = () => {
  //  To track the Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const navigate = useNavigate(); // to navigate the user After Logged in 
  const { setUser } = useContext(UserContext) || { setUser: () => {} };  // extracting out setUser
  
  /**
   * Handle user login form submit
   * @param {Object} e
   */
  const  handleSubmit = async (e) => {
    e.preventDefault(); // tp prevent from browser refreash
    setStatusMessage('');
    setStatusType('');
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      // Save user details to persist session on page reload
      localStorage.setItem('user', JSON.stringify(data.user)); // Local storage me save kiya
      setUser(data.user); // Update global UserContext state
      navigate('/dashboard'); // 
    } catch (error) {
      console.error("Login Error:", error);
      setStatusMessage(error.message || "Something went wrong during login!");
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  
    }

  return (
    <div className="relative container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Loading visible={loading} message="Logging in..." />
      <div className="card p-4 shadow-sm" style={{ width: '22rem', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 text-slate-800 font-bold">Login</h2>
        {statusMessage && (
          <div className={`mb-4 rounded-lg px-4 py-3 text-sm ${statusType === 'error' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {statusMessage}
          </div>
        )}
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