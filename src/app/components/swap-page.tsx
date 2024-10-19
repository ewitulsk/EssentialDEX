"use client";
import React, { useState } from 'react';

const SwapPage = () => {
  const [sellAmount, setSellAmount] = useState('');
  const [selectedSellToken, setSelectedSellToken] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [selectedBuyToken, setSelectedBuyToken] = useState('');

  const handleSellChange = (e) => setSellAmount(e.target.value);
  const handleSellTokenChange = (e) => setSelectedSellToken(e.target.value);
  const handleBuyChange = (e) => setBuyAmount(e.target.value);
  const handleBuyTokenChange = (e) => setSelectedBuyToken(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Selling: ${sellAmount} ${selectedToken}, Buying: ${buyAmount}`);
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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Sell Section */}
        <div style={styles.section}>
          <label htmlFor="sellAmount" style={styles.label}>Sell</label>
          <input
            type="number"
            id="sellAmount"
            value={sellAmount}
            onChange={handleSellChange}
            placeholder="0"
            style={styles.input}
          />
          <select value={selectedSellToken} onChange={handleSellTokenChange} style={styles.select}>
            <option value="" disabled>Select token</option>
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
            <option value="USDC">USDC</option>
          </select>
        </div>

        {/* Arrow Icon */}
        <div style={styles.arrow} onClick={handleSwap}>↓</div>

        {/* Buy Section */}
        <div style={styles.section}>
          <label htmlFor="buyAmount" style={styles.label}>Buy</label>
          <input
            type="number"
            id="buyAmount"
            value={buyAmount}
            onChange={handleBuyChange}
            placeholder="0"
            style={styles.input}
          />
          <select value={selectedBuyToken} onChange={handleBuyTokenChange} style={styles.select}>
            <option value="" disabled>Select token</option>
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
            <option value="USDC">USDC</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Get Started
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    color: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  label: {
    flex: '1',
  },
  input: {
    flex: '2',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#333',
    color: 'white',
  },
  select: {
    flex: '1',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#333',
    color: 'white',
  },
  arrow: {
    textAlign: 'center',
    fontSize: '24px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#6200ea',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default SwapPage;
