'use client';
import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback } from 'react';

import detectEthereumProvider from '@metamask/detect-provider';
import { formatBalance } from '@/app/lib/utils';;

interface WalletState {
  accounts: any[];
  balance: string;
  chainId: string;
}

interface MetaMaskContextData {
  wallet: WalletState;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  connectMetaMask: () => void;
  clearError: () => void;
  changeCurrentChain: (chainId: string) => void;
}

const disconnectedState: WalletState = { accounts: [], balance: '', chainId: '' };

const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const clearError = () => setErrorMessage('');

  const [wallet, setWallet] = useState(disconnectedState);
  // useCallback ensures that we don't uselessly re-create the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts = providedAccounts || (typeof window !== 'undefined' && await window.ethereum.request(
      { method: 'eth_accounts' },
    ));

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      return
    }

    const balance = typeof window === 'undefined' ? '0' : formatBalance(await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }));
    const chainId = typeof window === 'undefined' ? '0' : await window.ethereum.request({
      method: 'eth_chainId',
    });

    setWallet({ accounts, balance, chainId });
  }, []);

  const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet]);
  const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet]);

  const changeCurrentChain = async (chainId: string) => {
    if (typeof window !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
        console.log('успех');
      } catch (switchError) {
        console.log({switchError});
      }
    }
  };

  /**
   * This logic checks if MetaMask is installed. If it is, then we setup some
   * event handlers to update the wallet state when MetaMask changes. The function
   * returned from useEffect is used as a "clean-up": in there, we remove the event
   * handlers whenever the MetaMaskProvider is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider && typeof window !== 'undefined') {
        updateWalletAndAccounts();
        window.ethereum.on('accountsChanged', updateWallet);
        window.ethereum.on('chainChanged', updateWalletAndAccounts);
      }
    }

    getProvider();

    return () => {
      if (typeof window !== 'undefined') {
        window.ethereum?.removeListener('accountsChanged', updateWallet);
        window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts);
      }
    }
  }, [updateWallet, updateWalletAndAccounts]);

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      const accounts = typeof window === 'undefined' ? [] : await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      clearError();
      updateWallet(accounts);
    } catch(err: any) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  }

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask,
        clearError,
        changeCurrentChain,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  )
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"');
  }
  return context;
};
