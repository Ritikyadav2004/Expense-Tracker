import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbarr from './components/Navbarr';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-slate-900 font-body antialiased">
      <Navbarr />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;