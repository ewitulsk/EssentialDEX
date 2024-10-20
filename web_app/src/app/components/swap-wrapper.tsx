// web_app/src/app/components/Header.tsx
import React, { useState } from 'react';
import SwapPage from "./swap-page";
import Header from "./header";

const SwapWrapper: React.FC = () => {
  const navOptions = [
    { header: 'Swap', component: SwapPage },
    { header: 'Limit', component: SwapPage },
    { header: 'Send', component: SwapPage },
    { header: 'Buy', component: SwapPage }
  ];

  const [activeView, setActiveView] = useState(navOptions[0].header)

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

        <Header/>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10">
          <div className="flex flex-col w-full">
            <div className="flex space-x-4 mb-6">
              {navOptions.map((option) => (
                <button onClick={() => setActiveView(option.header)} key={`${option.header}-button`} className={`px-4 py-2 bg-gray-800 text-white rounded-full ${activeView === option.header ? 'bg-purple-700' : ''}`}>{option.header}</button>
              ))}
            </div>
            <div className="swap-pages">
              {navOptions.map((option) => (
                activeView === option.header && <option.component key={option.header} />
              ))}
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

export default SwapWrapper;
