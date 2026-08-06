import React from 'react';

const Loading = ({ visible, message = 'Please wait...' }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-6 py-5 shadow-lg border border-slate-200">
        <div className="h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-sm font-semibold text-slate-900">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
