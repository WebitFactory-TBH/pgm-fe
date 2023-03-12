import ContractConnectI from '../services/ContractConnect/Contract.interface';
import { Contracts } from '../services/ContractConnect/contracts';
import { ContractTypes } from '../types/ContractTypes';
import React from 'react';

interface ContractContextI {
  contract: ContractConnectI | null;
  connectContract: (contractType: ContractTypes, walletAddress: string) => any;
}

const defaultState: ContractContextI = {
  contract: null,
  connectContract: () => {}
};

// !TODO adauga action payload types pentru typesafety (vezi reducer portfolios hodlezz mobile)
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'REMOVE_CONTRACT': {
      return defaultState;
    }
    case 'SET_CONTRACT': {
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

const ContractContext = React.createContext<ContractContextI>(defaultState);

const ContractProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  const passValue: ContractContextI = {
    contract: state.contract,
    connectContract: async (
      contractType: ContractTypes,
      walletAddress: string
    ) => {
      try {
        const contract: ContractConnectI = new Contracts[contractType](
          walletAddress
        );
        dispatch({
          type: 'SET_CONTRACT',
          payload: { contract }
        });
        return contract;
      } catch (err) {
        console.error(err);
        throw new Error('There was an error connecting to smart contract.');
      }
    }
  };

  return (
    <ContractContext.Provider value={passValue}>
      {children}
    </ContractContext.Provider>
  );
};

const useContract = () => {
  const context = React.useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};

export { ContractProvider, useContract };
