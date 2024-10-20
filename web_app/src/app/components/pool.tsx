// web_app/src/app/components/Header.tsx
import React, { useEffect, useState } from 'react';
import Header from "./header";
import { Link } from 'react-router-dom';
import Circles from "./circles";
import { lp_bal, ess_bal } from '../ess/helpers';

const Pool: React.FC = () => {

  const [lpBalance, setLpBalance] = useState(0);
  const [essBalance, setEssBalance] = useState(0);

  useEffect(() => {
    const getBalances = async () => {
      setLpBalance(await lp_bal(1))
      setEssBalance(await ess_bal(1))
    }
    getBalances()
  }, [])

  return (
    <>
      <div className="relative min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black overflow-hidden">
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
          <div className="flex flex-col w-full items-center justify-center rounded-lg">
            {lpBalance == null || lpBalance == 0 &&
              <div className="flex items-center justify-center min-h-[10rem]">
                <p className="text-gray-400">Your active liquidity positions will appear here.</p>
              </div>
            }
            {lpBalance > 0 && (
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-[#A6FF34]">ETH/USDC</span>
                    <span className="bg-[#A6FF34] text-black text-xs font-semibold px-2 py-1 rounded-full">Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-700 p-2 rounded">
                      <span className="text-gray-400">APR</span>
                      <p className="font-bold text-[#A6FF34]">5.55%</p>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <span className="text-gray-400">Fee</span>
                      <p className="font-bold text-[#A6FF34]">0.3%</p>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <span className="text-gray-400">Network</span>
                      <p className="font-bold text-[#A6FF34]">Essential</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-700 p-3 rounded-lg">
                    <span className="text-gray-400">Current Balance</span>
                    <p className="text-2xl font-bold text-[#A6FF34]">{lpBalance} LP</p>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full mt-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-[#A6FF34]">ESS Balance</span>
                </div>
                <div className="mt-4 bg-gray-700 p-3 rounded-lg">
                  <span className="text-gray-400">Current Balance</span>
                  <p className="text-2xl font-bold text-[#A6FF34]">{essBalance} ESS</p>
                </div>
              </div>
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
