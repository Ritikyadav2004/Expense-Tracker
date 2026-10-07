import React from 'react';

const Loading = ({ visible, message = 'Please wait...' }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-8 py-6 shadow-2xl border border-slate-200/90 max-w-xs text-center animate-fade-rise">
        <div className="h-10 w-10 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
        <p className="text-xs uppercase tracking-widest font-semibold text-slate-700 font-sans">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
