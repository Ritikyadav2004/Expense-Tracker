import React, { useState, useContext } from 'react';
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { loginUser } from '../services/expenseService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext) || { setUser: () => {} };
  
  /**
   * Handle user login form submit
   * @param {Object} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setStatusType('');
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login Error:", error);
      setStatusMessage(error.message || "Invalid credentials provided.");
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#fafafa] py-16 px-6 sm:px-10">
      <Loading visible={loading} message="Authenticating session..." />

      <div className="w-full max-w-md">
        
        {/* Header Title */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold block mb-2 font-sans">
            Account Access
          </span>
          <h1 
            className="text-4xl sm:text-5xl font-normal text-slate-900 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Welcome <em>Back</em>
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-body">
            Authenticate to manage personal expenses and portfolios.
          </p>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div className={`mb-6 rounded-full px-6 py-3 text-sm text-center font-medium border ${
            statusType === 'error' 
              ? 'bg-rose-50 border-rose-200 text-rose-700' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            {statusMessage}
          </div>
        )}

        {/* Editorial Form Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label 
                htmlFor="login-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
              >
                Email Address
              </label>
              <input 
                id="login-email"
                type="email" 
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition" 
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="login-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
              >
                Password
              </label>
              <input 
                id="login-password"
                type="password" 
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            {/* Submit Pill Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full btn-pill btn-pill-primary py-3.5 text-sm font-medium shadow-sm"
                style={{ backgroundColor: '#000000', color: '#ffffff', borderRadius: '9999px' }}
              >
                Sign In to Account
              </button>
            </div>
          </form>

          {/* Quick Demo credentials helper */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-500 font-mono block mb-3">
              Demo: ritik@example.com / password123
            </span>
            <span className="text-slate-500 text-xs">Don't have an account yet? </span>
            <Link to="/signup" className="text-slate-900 font-semibold text-xs underline ml-1 hover:text-black">
              Sign Up
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;