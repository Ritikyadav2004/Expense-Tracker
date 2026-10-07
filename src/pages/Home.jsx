import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Home() {
  const { user } = useContext(UserContext) || { user: null };

  return (
    <div className="w-full bg-[#fafafa] text-slate-900 overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section 
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{ minHeight: '100vh', backgroundColor: 'hsl(201, 100%, 13%)' }}
      >
        {/* Full-bleed background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source 
            src="https://designerstephen.github.io/public-assets/videos/serene-art-hero.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Subtle dark overlay ~ rgba(0, 0, 0, 0.20) for optimal contrast */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)' }}
        />

        {/* Center Hero Content Container */}
        <div className="relative z-20 max-w-[1280px] w-full mx-auto px-6 sm:px-8 py-24 flex flex-col items-center justify-center text-center">
          
          {/* Main H1 Headline: 80px desktop, 48px mobile, line-height 0.95, letter-spacing -2.46px */}
          <h1 
            className="editorial-h1 text-white text-center anim-fade-rise anim-delay-0 max-w-5xl drop-shadow-md select-none"
            style={{ 
              fontFamily: "'Instrument Serif', Georgia, serif", 
              fontWeight: 400, 
              lineHeight: 0.95,
              letterSpacing: '-2.46px'
            }}
          >
            Track Your <em>Expense</em>
          </h1>

          {/* Hero Subtitle Description */}
          <p 
            className="font-body text-white/95 text-[18px] font-normal leading-[1.625] max-w-[670px] mt-8 anim-fade-rise anim-delay-200 drop-shadow"
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: '18px', 
              fontWeight: 400, 
              lineHeight: 1.625,
              maxWidth: '670px'
            }}
          >
            Tracking expenses transforms financial anxiety into control by replacing guesswork with data.
          </p>

          {/* Hero Primary CTA: Prominent Black Pill */}
          <div className="mt-12 anim-fade-rise anim-delay-400">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="btn-pill btn-pill-primary shadow-2xl hover:shadow-black/40 transition-all duration-300"
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: '9999px',
                padding: '20px 56px',
                fontSize: '16px',
                fontWeight: 500
              }}
            >
              {user ? "View Dashboard" : "Get Started"}
            </Link>
          </div>

        </div>

        {/* Scroll indicator hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/60 text-[11px] tracking-[0.25em] uppercase font-mono flex flex-col items-center gap-2 pointer-events-none">
          <span>Scroll to explore</span>
          <div className="w-[1px] h-6 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* 2. "WHY EXPENSE TRACKING MATTERS" SECTION */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 py-32 bg-[#fafafa]">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold block mb-3 font-sans">
            The Philosophy of Financial Clarity
          </span>
          <h2 
            className="text-5xl sm:text-6xl md:text-7xl font-normal text-slate-900 tracking-tight leading-[1.05]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Why Expense Tracking <em>Matters</em>
          </h2>
          <div className="w-16 h-[1px] bg-slate-300 mx-auto mt-8" />
        </div>

        {/* 3 Pillars Grid with Enhanced Elevation & Scale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Pillar 1: Financial Awareness */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-10 lg:p-12 shadow-sm hover:shadow-2xl hover:border-slate-300/90 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">
                  01 / Pillar
                </span>
                <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
              </div>
              
              <h3 
                className="text-3xl font-normal text-slate-900 mb-4"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Financial Awareness
              </h3>
              
              <p className="text-sm leading-relaxed text-slate-600 mb-8 font-body">
                Clarity replaces the psychological weight of the unknown with tangible data points and unwavering confidence.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3 text-xs font-medium">
              <div className="flex items-start gap-2.5 text-slate-900">
                <span className="text-emerald-700 font-bold shrink-0">✓</span>
                <div>
                  <span className="font-semibold text-slate-900">Trackers:</span> Know exactly where every rupee goes.
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-slate-500">
                <span className="text-slate-400 font-bold shrink-0">✗</span>
                <div>
                  <span className="font-semibold text-slate-600">Non-Trackers:</span> Guess their balances and wonder where money went.
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Spending Behavior */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-10 lg:p-12 shadow-sm hover:shadow-2xl hover:border-slate-300/90 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">
                  02 / Pillar
                </span>
                <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
              </div>
              
              <h3 
                className="text-3xl font-normal text-slate-900 mb-4"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Spending Behavior
              </h3>
              
              <p className="text-sm leading-relaxed text-slate-600 mb-8 font-body">
                Observing daily financial outflows creates deliberate decision-making rather than automated impulsive spending.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3 text-xs font-medium">
              <div className="flex items-start gap-2.5 text-slate-900">
                <span className="text-emerald-700 font-bold shrink-0">✓</span>
                <div>
                  <span className="font-semibold text-slate-900">Trackers:</span> Catch hidden leaks like unused subscriptions early.
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-slate-500">
                <span className="text-slate-400 font-bold shrink-0">✗</span>
                <div>
                  <span className="font-semibold text-slate-600">Non-Trackers:</span> Suffer from impulse buying and frequent overspending.
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3: Saving & Investing */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-10 lg:p-12 shadow-sm hover:shadow-2xl hover:border-slate-300/90 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">
                  03 / Pillar
                </span>
                <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
              </div>
              
              <h3 
                className="text-3xl font-normal text-slate-900 mb-4"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Saving & Investing
              </h3>
              
              <p className="text-sm leading-relaxed text-slate-600 mb-8 font-body">
                Transform residual capital into intentional investments by allocating capital forward rather than retrospectively.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3 text-xs font-medium">
              <div className="flex items-start gap-2.5 text-slate-900">
                <span className="text-emerald-700 font-bold shrink-0">✓</span>
                <div>
                  <span className="font-semibold text-slate-900">Trackers:</span> Save intentionally first, then spend the rest.
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-slate-500">
                <span className="text-slate-400 font-bold shrink-0">✗</span>
                <div>
                  <span className="font-semibold text-slate-600">Non-Trackers:</span> Save only what is left at month-end.
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 3. EDITORIAL QUOTE: Strong Visual Statement */}
      <section className="w-full bg-white border-y border-slate-200/90 py-36 px-6 sm:px-8">
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
          
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-mono font-medium mb-8">
            The Law of Financial Direction
          </span>

          <blockquote 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-slate-900 leading-[1.08] tracking-tight max-w-4xl"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            “A budget is telling your money where to go, instead of wondering where it <em>went</em>.”
          </blockquote>

          <div className="w-12 h-[1px] bg-slate-300 my-10" />

          <p className="text-xs uppercase tracking-widest text-slate-500 font-sans mb-12">
            Take intentional control of your portfolio today.
          </p>

          <Link
            to={user ? "/add-expense" : "/signup"}
            className="btn-pill btn-pill-primary shadow-xl hover:shadow-black/30 transition-all duration-300"
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRadius: '9999px',
              padding: '18px 50px',
              fontSize: '15px',
              fontWeight: 500
            }}
          >
            {user ? "Add New Expense" : "Create Free Account"}
          </Link>

        </div>
      </section>

    </div>
  );
}

export default Home;