import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Premium Minimalist Fintech Logo for Trackify
 * Supports variants: 'full' (emblem + editorial wordmark) or 'icon' (emblem only).
 */
export function LogoIcon({ className = "w-8 h-8", variant = "default" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-xl overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #090d16 0%, #151d2e 100%)',
      }}
    >
      {/* Subtle ambient highlight */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 60%)'
        }}
      />

      <svg 
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-[72%] h-[72%] relative z-10"
      >
        {/* Precision geometric financial emblem */}
        {/* Horizontal balance bar */}
        <path 
          d="M8 12.5H28" 
          stroke="#ffffff" 
          strokeWidth="2.75" 
          strokeLinecap="round" 
        />
        {/* Vertical tracking stem with growth facet */}
        <path 
          d="M18 12.5V26" 
          stroke="#ffffff" 
          strokeWidth="2.75" 
          strokeLinecap="round" 
        />
        {/* Dynamic upward chevron indicator (tracking wealth momentum) */}
        <path 
          d="M12.5 21.5L18 26.5L23.5 21.5" 
          stroke="#94a3b8" 
          strokeWidth="2.25" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Focal precision diamond node */}
        <rect 
          x="16.25" 
          y="10.75" 
          width="3.5" 
          height="3.5" 
          transform="rotate(45 18 12.5)" 
          fill="#38bdf8" 
        />
      </svg>

      {/* Ultra-fine hairline border */}
      <div className="absolute inset-0 rounded-xl border border-white/15 pointer-events-none" />
    </div>
  );
}

export default function Logo({ 
  to = "/", 
  showText = true, 
  size = "md", 
  className = "",
  subtext = false 
}) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8 sm:w-9 sm:h-9",
    lg: "w-10 h-10 sm:w-11 sm:h-11"
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl sm:text-[28px]",
    lg: "text-3xl sm:text-4xl"
  };

  const content = (
    <div className={`inline-flex items-center gap-3 group leading-none select-none ${className}`}>
      <LogoIcon className={iconSizes[size] || iconSizes.md} />
      {showText && (
        <div className="flex flex-col">
          <span 
            className={`${textSizes[size] || textSizes.md} font-normal text-slate-900 tracking-tight leading-none group-hover:text-black transition-colors`}
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Trackify<sup className="text-[10px] sm:text-xs font-sans font-medium ml-0.5 tracking-normal text-slate-700">®</sup>
          </span>
          {subtext && (
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mt-1">
              Fintech Ledger
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="no-underline inline-block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
