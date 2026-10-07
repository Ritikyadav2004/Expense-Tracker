import React, { useState } from 'react';
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/expenseService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  const navigate = useNavigate();

  /**
   * Handle user signup form submit
   * @param {Object} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setStatusMessage("Password must be at least 6 characters long!");
      setStatusType('error');
      return;
    }

    setStatusMessage('');
    setStatusType('');
    setLoading(true);
    try {
      await registerUser({ name: username, email, password });
      navigate('/login');
    } catch (error) {
      console.error("Registration Error:", error);
      setStatusMessage(error.message || "Registration encountered an issue.");
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#fafafa] py-16 px-6 sm:px-10">
      <Loading visible={loading} message="Creating account..." />

      <div className="w-full max-w-md">
        
        {/* Header Title */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold block mb-2 font-sans">
            Membership Registration
          </span>
          <h1 
            className="text-4xl sm:text-5xl font-normal text-slate-900 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Create <em>Account</em>
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-body">
            Begin tracking your finances with intentional clarity.
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
            
            {/* Full Name Field */}
            <div>
              <label 
                htmlFor="signup-name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
              >
                Full Name
              </label>
              <input 
                id="signup-name"
                type="text" 
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition" 
                placeholder="Ritik Yadav"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>

            {/* Email Field */}
            <div>
              <label 
                htmlFor="signup-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
              >
                Email Address
              </label>
              <input 
                id="signup-email"
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
                htmlFor="signup-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
              >
                Password
              </label>
              <input 
                id="signup-password"
                type="password" 
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition" 
                placeholder="Minimum 6 characters"
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
                Create Account
              </button>
            </div>
          </form>

          {/* Link to Login */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <span className="text-slate-500 text-xs">Already have an account? </span>
            <Link to="/login" className="text-slate-900 font-semibold text-xs underline ml-1 hover:text-black">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;