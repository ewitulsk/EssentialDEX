// web_app/src/app/components/Header.tsx
import React, { useState } from 'react';
import SwapPage from "./swap-page";

const Header: React.FC = () => {
  const navOptions = [
    { header: 'Swap', component: SwapPage },
    { header: 'Limit', component: SwapPage },
    { header: 'Send', component: SwapPage },
    { header: 'Buy', component: SwapPage }
  ];

  const [activeView, setActiveView] = useState(navOptions[0].header)

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">PINT SWAP</h1>
      <div className="flex flex-col w-full">
        <div className="flex space-x-4 mb-6">
          {navOptions.map((option) => (
            <button onClick={() => setActiveView(option.header)} className={`px-4 py-2 bg-gray-800 text-white rounded-full ${activeView === option.header ? 'bg-purple-700' : ''}`}>{option.header}</button>
          ))}
        </div>
        <div className="swap-pages">
          {navOptions.map((option) => (
            activeView === option.header && <option.component key={option.header} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
