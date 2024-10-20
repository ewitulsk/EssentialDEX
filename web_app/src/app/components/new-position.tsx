// web_app/src/app/components/Header.tsx
import React, { useState } from 'react';
import Header from "./header";
import TokenInput from "./token-input";
import Snackbar from './snackbar';
import WaitingSolveModal from './waiting-solve-modal';

import { provide_liquidity } from '../ess/helpers';
import { useNavigate } from 'react-router-dom';

const NewPosition: React.FC = () => {
  let color = '#A6FF34';

  const [sellAmount, setSellAmount] = useState();
  const [selectedSellToken, setSelectedSellToken] = useState("ethereum");
  const [buyAmount, setBuyAmount] = useState();
  const [selectedBuyToken, setSelectedBuyToken] = useState("usd");
  const [showModal, setShowModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSellChange = (e: React.ChangeEvent<HTMLInputElement>) => setSellAmount(e.target.value);
  const handleSellTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSellToken(e.target.value);
  const handleBuyChange = (e: React.ChangeEvent<HTMLInputElement>) => setBuyAmount(e.target.value);
  const handleBuyTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedBuyToken(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setShowModal(true);
    e.preventDefault();

    await provide_liquidity(1, Number(buyAmount), Number(sellAmount))
    clearInputs()
    setShowModal(false);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 5000);

    // Redirect to pool page using React Router
    navigate('/pool');
  }

  const clearInputs = () => {
    setSellAmount('');
    setBuyAmount('');
    setSelectedSellToken('ethereum');
    setSelectedBuyToken('');
  }

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

        <Header color={color} />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10 w-full min-w-[50rem] max-w-4xl">

          <div className="max-w-md mx-auto p-5 bg-gray-900 rounded-lg text-white">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-5 rounded-lg flex flex-col gap-5">
              <h2 className="text-lg font-bold">Deposit amounts</h2>


              <h3 className="text-sm font-medium text-gray-400">Deposit amounts</h3>
              <TokenInput
                amount={sellAmount || ''}
                onAmountChange={handleSellChange}
                selectedToken={selectedSellToken}
                onTokenChange={handleSellTokenChange}
              />

              {/* Buy Section */}
              <TokenInput
                amount={buyAmount || ''}
                onAmountChange={handleBuyChange}
                selectedToken={selectedBuyToken}
                onTokenChange={handleBuyTokenChange}
              />

              <button
                type="submit"
                className={`mt-4 p-2 bg-[${color}] font-semibold text-sm border-none rounded-xl text-black cursor-pointer text-base hover:opacity-80 transition-opacity duration-300 w-full`}
                onClick={handleSubmit}
                >
                Approve
              </button>
            </form>
          </div>
        </main>

        <WaitingSolveModal showModal={showModal} header='Depositing your liquidity' />
        <Snackbar showSnackbar={showSnackbar} message={'Deposit successful'}/>

        {/* Footer */}
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center z-10">
        {/* Footer content here */}
        </footer>
        </div>
    </>
  );
};

export default NewPosition;
