"use client";


import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import Web3 from 'web3';

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  let ethereum : any
    if (typeof window !== "undefined") {
      ethereum = (window as any).ethereum;
   }
   
  const connectWallet = async () => {
    if (ethereum) {
      try {
        const web3Instance = new Web3(ethereum);
        await ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        localStorage.setItem('isWalletConnected', 'true');
      } catch (error) {
        console.error('Erreur de connexion au wallet :', error);
      }
    } else {
      alert('Veuillez installer MetaMask pour utiliser cette fonctionnalité.');
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
    localStorage.removeItem('isWalletConnected');
  };

  useEffect(() => {
    const isWalletConnected = localStorage.getItem('isWalletConnected');
    if (isWalletConnected === 'true') {
      connectWallet();
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{ web3, account, connectWallet, disconnectWallet }}
    >
      {children}
    </Web3Context.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 doit être utilisé dans un Web3Provider');
  }
  return context;
};
