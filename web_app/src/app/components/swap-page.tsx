"use client";
import React, { useState, useCallback } from 'react';
import TokenInput from './token-input';
import axios from 'axios';
import { debounce } from 'lodash';

const SwapPage = () => {
  const fetchConversionRate = async (sellToken: string, buyToken: string, setAmount: (amount: string) => void) => {
    if (!sellToken || !buyToken || sellToken === buyToken) return;

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${sellToken}&vs_currencies=${buyToken}`
      );
      setAmount(response.data[sellToken][buyToken])
    } catch (err) {
      console.log('error', err)
    }
  };

  const debouncedFetchConversionRate = useCallback(
    debounce((sellToken: string, buyToken: string, setAmount: (amount: string) => void) => {
      fetchConversionRate(sellToken, buyToken, setAmount);
    }, 300),
    []
  );

  const [sellAmount, setSellAmount] = useState('');
  const [selectedSellToken, setSelectedSellToken] = useState('ethereum');
  const [buyAmount, setBuyAmount] = useState('');
  const [selectedBuyToken, setSelectedBuyToken] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);


  const handleSellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellAmount(e.target.value)
    debouncedFetchConversionRate(selectedSellToken, selectedBuyToken, setBuyAmount)
  }
  const handleSellTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSellToken(e.target.value);
  }

  const handleBuyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyAmount(e.target.value)
    debouncedFetchConversionRate(selectedBuyToken, selectedSellToken, setSellAmount)
  }
  const handleBuyTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBuyToken(e.target.value);
  }

  const handleSubmit = (e) => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 5000);
    }, 4000);

    e.preventDefault();
  };

  const handleSwap = () => {
    const tempSellAmount = sellAmount;
    const tempSellToken = selectedSellToken;
    setSellAmount(buyAmount);
    setSelectedSellToken(selectedBuyToken);

    setBuyAmount(tempSellAmount);
    setSelectedBuyToken(tempSellToken);
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-gray-900 rounded-lg text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Sell Section */}
        <TokenInput
          label="Sell"
          amount={sellAmount}
          onAmountChange={handleSellChange}
          selectedToken={selectedSellToken}
          onTokenChange={handleSellTokenChange}
        />

        {/* Arrow Icon */}
        <div className="text-center text-2xl cursor-pointer" onClick={handleSwap}>↓</div>

        {/* Buy Section */}
        <TokenInput
          label="Buy"
          amount={buyAmount}
          onAmountChange={handleBuyChange}
          selectedToken={selectedBuyToken}
          onTokenChange={handleBuyTokenChange}
        />

        <button
          type="submit"
          className="p-2 bg-purple-700 border-none rounded text-white cursor-pointer text-base hover:bg-purple-600 transition-colors"
        >
          Get Started
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-5 rounded-lg text-center flex flex-col items-center">
            <div className="spinner border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
            <p className="text-center w-1/2">Our solvers are on a mission to outsmart every challenge with even better solutions!</p>
          </div>
        </div>
      )}

        {/* Snackbar */}
        {showSnackbar && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-3 rounded-lg">
            Purchase completed!
          </div>
        )}
    </div>
  );
};

export default SwapPage;
