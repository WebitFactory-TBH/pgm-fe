import Metamask from '../services/WalletConnect/Metamask';
import WalletI from '../services/WalletConnect/Wallet.interface';
import { Wallets } from '../services/WalletConnect/Wallets';
import React from 'react';

export type WalletTypes = 'Metamask' | 'XPortal' | null;

interface WalletContextI {
  walletAddress: string;
  walletType: WalletTypes;
  wallet: WalletI | null;
  disconnectWallet: () => void;
  connectWallet: (walletType: WalletTypes) => any;
}

const defaultState = {
  walletAddress: '',
  walletType: null,
  wallet: null,
  disconnectWallet: () => {},
  connectWallet: (walletType: WalletTypes) => {},
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'REMOVE_WALLET': {
      return defaultState;
    }
    case 'SET_WALLET': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const WalletContext = React.createContext<WalletContextI>(defaultState);

const WalletProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  const passValue = {
    walletAddress: state.walletAddress,
    wallet: state.wallet,
    walletType: state.walletType,
    disconnectWallet: () => dispatch({ type: 'REMOVE_WALLET' }),

    connectWallet: async (walletType: WalletTypes) => {
      const wallet: WalletI = new Wallets[walletType as string]();
      let walletAddress;

      try {
        walletAddress = await wallet.init();
        dispatch({
          type: 'SET_WALLET',
          payload: { walletType, walletAddress, wallet },
        });
      } catch (err) {
        throw err;
      }

      return { walletAddress, wallet };
    },
  };

  return (
    <WalletContext.Provider value={passValue}>
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = () => {
  const context = React.useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export { WalletProvider, useWallet };
