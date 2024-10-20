// web_app/src/app/components/Header.tsx
import React, { useState } from 'react';
import Header from "./header";
import { Link } from 'react-router-dom';
import Circles from "./circles";
const Pool: React.FC = () => {
  return (
    <>
      <div className="relative min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-white/10"></div>
          <div className="absolute inset-4 rounded-full border border-white/10"></div>
          <div className="absolute inset-8 rounded-full border border-white/10"></div>
          <div className="absolute inset-12 rounded-full border border-white/10"></div>
          <div className="absolute inset-16 rounded-full border border-white/20"></div>
        </div>

        <Circles/>
        <Header color='#A6FF34'/>

        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10 w-full min-w-[50rem] max-w-4xl">
          <div className="flex justify-between w-full items-center mb-4">
            <h1 className="text-2xl font-bold">Positions</h1>
            <div className="flex space-x-4">
              <Link to={'/new_position'} className={ `bg-[#A6FF34] flex h-full font-semibold text-sm items-center justify-between gap-[1rem] rounded-xl px-[0.74rem] py-2 text-black hover:opacity-80 transition-opacity duration-300`}>
                + NEW POSITION
              </Link>
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center border border-gray-700 rounded-lg">
            <div className="flex items-center justify-center min-h-[10rem]">
              <p className="text-gray-400">Your active liquidity positions will appear here.</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center z-10">
        {/* Footer content here */}
        </footer>
        </div>
    </>
  );
};

export default Pool;
