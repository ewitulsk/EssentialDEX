// src/hooks/useMetaMask.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useMetaMask = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const account = accounts[0];
        setAccount(account);

        const providerInstance = new ethers.BrowserProvider(window.ethereum);
        setProvider(providerInstance);

        const balance = await providerInstance.getBalance(account);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert('MetaMask is not installed. Please install it!');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      // Update account on change
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });

      // Reload on network change
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return { account, balance, connectWallet };
};

export default useMetaMask;
