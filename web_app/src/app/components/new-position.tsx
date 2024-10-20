// web_app/src/app/components/Header.tsx
import React, { useState } from 'react';
import Header from "./header";
import TokenInput from "./token-input";

const NewPosition: React.FC = () => {

  const [sellAmount, setSellAmount] = useState();
  const [selectedSellToken, setSelectedSellToken] = useState("ETH");
  const [buyAmount, setBuyAmount] = useState();
  const [selectedBuyToken, setSelectedBuyToken] = useState("USDC");

  const handleSellChange = (e: React.ChangeEvent<HTMLInputElement>) => setSellAmount(e.target.value);
  const handleSellTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSellToken(e.target.value);
  const handleBuyChange = (e: React.ChangeEvent<HTMLInputElement>) => setBuyAmount(e.target.value);
  const handleBuyTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedBuyToken(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Selling: ${sellAmount} ${selectedSellToken}, Buying: ${buyAmount} ${selectedBuyToken}`);
  };

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
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10 w-full min-w-[50rem] max-w-4xl">
          <div className="max-w-md mx-auto p-5 bg-gray-900 rounded-lg text-white">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-5 rounded-lg flex flex-col gap-5">
              <h2 className="text-lg font-bold">Deposit amounts</h2>
              {/* Sell Section */}
              <TokenInput
                amount={sellAmount}
                onAmountChange={handleSellChange}
                selectedToken={selectedSellToken}
                onTokenChange={handleSellTokenChange}
              />

              {/* Buy Section */}
              <TokenInput
                amount={buyAmount}
                onAmountChange={handleBuyChange}
                selectedToken={selectedBuyToken}
                onTokenChange={handleBuyTokenChange}
              />

              <button
                type="submit"
                className="p-2 bg-purple-700 border-none rounded text-white cursor-pointer text-base hover:bg-purple-600 transition-colors"
              >
                Review
              </button>
            </form>
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

export default NewPosition;
