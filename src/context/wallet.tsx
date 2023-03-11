import WalletI from '../services/WalletConnect/Wallet.interface';
import { Wallets } from '../services/WalletConnect/Wallets';
import { WalletTypes } from '../types/WalletTypes';
import React from 'react';

interface WalletContextI {
  walletAddress: string;
  walletType: typeof Wallets | null;
  wallet: WalletI | null;
  disconnectWallet: VoidFunction;
  connectWallet: (walletType: WalletTypes) => any;
}

const defaultState: WalletContextI = {
  walletAddress: '',
  walletType: null,
  wallet: null,
  disconnectWallet: () => {},
  connectWallet: () => {}
};

// !TODO adauga action payload types pentru typesafety (vezi reducer portfolios hodlezz mobile)
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'REMOVE_WALLET': {
      return defaultState;
    }
    case 'SET_WALLET': {
      return {
        ...state,
        ...action.payload
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

  const passValue: WalletContextI = {
    walletAddress: state.walletAddress,
    wallet: state.wallet,
    walletType: state.walletType,
    disconnectWallet: () => dispatch({ type: 'REMOVE_WALLET' }),
    connectWallet: async (walletType) => {
      const wallet: WalletI = new Wallets[walletType]();
      let walletAddress;

      try {
        walletAddress = await wallet.init();
        dispatch({
          type: 'SET_WALLET',
          payload: { walletType, walletAddress, wallet }
        });
      } catch (err) {
        throw err;
      }

      return { walletAddress, wallet };
    }
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
