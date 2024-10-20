'use client'
import SwapPage from "./components/swap-page";
import { useState } from "react";
import useMetaMask from "./components/meta-mask";
export default function Home() {
  const navOptions = [
    { header: 'Exact/Exact', component: SwapPage },
    { header: 'Exact/Market', component: SwapPage },
    { header: 'Exact/Range', component: SwapPage }
  ];

  const [activeView, setActiveView] = useState(navOptions[0].header)

  const { account, balance, connectWallet, getPublicKey, signMessage } = useMetaMask();

  return (
    <div className="relative min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black overflow-hidden">
      {/* Concentric Circles Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 rounded-full border border-white/10"></div>
        <div className="absolute inset-4 rounded-full border border-white/10"></div>
        <div className="absolute inset-8 rounded-full border border-white/10"></div>
        <div className="absolute inset-12 rounded-full border border-white/10"></div>
        <div className="absolute inset-16 rounded-full border border-white/20"></div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10">

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>MetaMask Integration with React</h1>
        {account ? (
          <div>
            <p>Connected Account: {account}</p>
            <p>Balance: {balance} ETH</p>
            <button onClick={() => signMessage('Hello, world!')}>Sign Message</button>
            <button onClick={() => getPublicKey()}>Public Key</button>
          </div>
        ) : (
          <button onClick={connectWallet}>Connect MetaMask</button>
        )}
      </div>

        <h1 className="text-2xl font-bold mb-4">PINT SWAP</h1>
        <div className="flex flex-col w-full">
          <div className="flex space-x-4 mb-6">
            {navOptions.map((option) => (
              <button onClick={() => setActiveView(option.header)} className={`px-4 py-2 bg-gray-800 text-white rounded-full ${activeView === option.header ? 'bg-purple-700' : ''}`}>{option.header}</button>
            ))}
          </div>
          <div className="swap-pages">
            {navOptions.map((option) => (
              activeView === option.header && <option.component key={option.header} header={option.header} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center z-10">
        {/* Footer content here */}
      </footer>
    </div>
  );
}
