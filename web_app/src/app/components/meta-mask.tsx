// src/hooks/useMetaMask.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useMetaMask = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [publicKey, setPublicKey] = useState(null);

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

  const getPublicKey = async () => {
    if (!account || !provider) {
      console.error('Connect to MetaMask first.');
      return;
    }


    try {
      const publicKey = await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [account],
     })

      // const messageHash = ethers.hashMessage(message);
      // const recoveredPublicKey = ethers.recoverPublicKey(messageHash, signature);
      setPublicKey(publicKey);
      console.log('Public Key:', publicKey);
    } catch (error) {
      console.error('Error retrieving public key:', error);
    }
  };

  const signMessage = async (message) => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const from = accounts[0];
    const signature = await ethereum.request({
      method: 'personal_sign',
      params: [message, from],
    });
    console.log('Signature:', signature);
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return { account, balance, publicKey, connectWallet, getPublicKey, signMessage };
};

export default useMetaMask;
