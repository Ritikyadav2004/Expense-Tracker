import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ExpenseOption from './ExpenseOption';
import UserContext from '../context/UserContext';

function Navbarr() {
  const { user, setUser } = useContext(UserContext) || { user: null, setUser: () => {} };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-3.5 sm:py-5">
        <div className="flex items-center justify-between md:grid md:grid-cols-3">
          
          {/* LEFT: Brand / Logo */}
          <div className="flex items-center justify-start shrink-0">
            <Link 
              to="/" 
              className="text-2xl sm:text-[30px] font-normal font-editorial text-slate-900 tracking-tight no-underline hover:opacity-85 transition-opacity leading-none"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }}
            >
              Trackify<sup className="text-[10px] sm:text-xs font-sans ml-0.5 tracking-normal">®</sup>
            </Link>
          </div>

          {/* CENTER: Navigation links (Hidden on mobile, centered on desktop) */}
          <nav className="hidden md:flex items-center justify-center space-x-8 lg:space-x-10 text-[14px] font-medium font-body text-slate-800">
            <Link 
              to="/" 
              className={`transition-colors no-underline ${isActive('/') ? 'text-black font-semibold' : 'text-slate-700 hover:text-black'}`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`transition-colors no-underline ${isActive('/dashboard') ? 'text-black font-semibold' : 'text-slate-700 hover:text-black'}`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Dashboard
            </Link>
            <Link 
              to="/add-expense" 
              className={`transition-colors no-underline ${isActive('/add-expense') ? 'text-black font-semibold' : 'text-slate-700 hover:text-black'}`}
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Add Expense
            </Link>
            <div className="flex items-center">
              <ExpenseOption />
            </div>
          </nav>

          {/* RIGHT: Pill CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="hidden lg:inline-block text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full truncate max-w-[120px]">
                  {user.name}
                </span>
                
                {/* Authenticated Pill CTA: Dashboard */}
                <Link
                  to="/dashboard"
                  className="btn-pill btn-pill-primary px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium shadow-sm whitespace-nowrap leading-none"
                  style={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    borderRadius: '9999px',
                    fontWeight: 500
                  }}
                >
                  Dashboard
                </Link>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-pill btn-pill-outline px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-medium border border-slate-300 hover:bg-slate-100 transition whitespace-nowrap leading-none"
                  title="Logout from session"
                >
                  Logout
                </button>
              </div>
            ) : (
              /* Unauthenticated Pill CTA: Login */
              <Link
                to="/login"
                className="btn-pill btn-pill-primary px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium shadow-sm whitespace-nowrap leading-none"
                style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontWeight: 500
                }}
              >
                Login
              </Link>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-full text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors ml-1"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile dropdown drawer menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-slate-200 mt-3 space-y-2.5 font-medium text-sm animate-fade-rise">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-2 py-1.5 rounded-lg no-underline ${isActive('/') ? 'bg-slate-100 text-black font-semibold' : 'text-slate-800'}`}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-2 py-1.5 rounded-lg no-underline ${isActive('/dashboard') ? 'bg-slate-100 text-black font-semibold' : 'text-slate-800'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/add-expense" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-2 py-1.5 rounded-lg no-underline ${isActive('/add-expense') ? 'bg-slate-100 text-black font-semibold' : 'text-slate-800'}`}
            >
              Add Expense
            </Link>
            <Link 
              to="/view-expense" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-2 py-1.5 rounded-lg no-underline ${isActive('/view-expense') ? 'bg-slate-100 text-black font-semibold' : 'text-slate-800'}`}
            >
              View Expenses
            </Link>
            <Link 
              to="/show-per-category" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-2 py-1.5 rounded-lg no-underline ${isActive('/show-per-category') ? 'bg-slate-100 text-black font-semibold' : 'text-slate-800'}`}
            >
              Category Breakdown
            </Link>

            {user ? (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-2">
                <span className="text-xs text-slate-500 truncate max-w-[180px]">
                  Signed in as <strong className="text-slate-800">{user.name}</strong>
                </span>
                <button 
                  type="button"
                  onClick={handleLogout}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold py-1 px-2 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-2">
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-900 font-semibold hover:underline"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-indigo-600 font-semibold hover:underline"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbarr;