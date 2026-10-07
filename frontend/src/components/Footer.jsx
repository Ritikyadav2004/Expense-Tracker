import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/90 bg-white pt-20 pb-16 px-6 sm:px-8 mt-auto">
      <div className="max-w-[1280px] mx-auto space-y-16">
        
        {/* Top Grid: Brand & Quick Links & CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-6 space-y-4">
            <Logo size="lg" subtext={true} />
            <p className="text-sm text-slate-600 font-body max-w-md leading-relaxed">
              Track Your Daily Expense Here. Precision budgeting, portfolio visibility, and intentional wealth architecture.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block font-medium mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-sm font-medium text-slate-700 list-none p-0 m-0">
              <li>
                <Link to="/" className="hover:text-black transition-colors no-underline">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-black transition-colors no-underline">
                  Financial Dashboard
                </Link>
              </li>
              <li>
                <Link to="/add-expense" className="hover:text-black transition-colors no-underline">
                  Record Expenditure
                </Link>
              </li>
              <li>
                <Link to="/edit-expense" className="hover:text-black transition-colors no-underline">
                  Modify Expenses
                </Link>
              </li>
              <li>
                <Link to="/show-per-category" className="hover:text-black transition-colors no-underline">
                  Category Distribution
                </Link>
              </li>
            </ul>
          </div>

          {/* Repository & External */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block font-medium mb-4">
              Open Source
            </span>
            <a 
              href="https://github.com/Ritikyadav2004/Expense-Tracker/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-pill btn-pill-outline btn-pill-small inline-flex items-center gap-2 hover:bg-slate-50 transition"
            >
              <span>View Repository</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

        </div>

        {/* Bottom Line: Copyright & Status */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Operational · Fintech Engine Active</span>
          </div>
          <div>
            © 2026 Trackify®. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;