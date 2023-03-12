import useLocalStorage from '../hooks/useLocalStorage';
import React from 'react';

export interface User {
  id: string;
  nickname: string;
  wallets: any;
  billingAddress: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companyRegNo: string;
}

interface UserProviderProps {
  children: React.ReactNode;
  initialValue: User | null;
}

interface IUserContext {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (user: Partial<User>) => void;
  removeUser: () => void;
}

const defaultState = {
  user: null,
  setUser: () => {},
  updateUser: () => {},
  removeUser: () => {},
};

// !TODO adauga action payload types pentru typesafety (vezi reducer portfolios hodlezz mobile)
const reducer = (state: User, action: any) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.payload;
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'REMOVE_USER': {
      return null;
    }
    default: {
      return state;
    }
  }
};

const UserContext = React.createContext<IUserContext>(defaultState);

const UserProvider = (props: UserProviderProps) => {
  const { children } = props;
  const [userLocal, setUserLocal] = useLocalStorage<any>('user', null);
  const [state, dispatch] = React.useReducer(reducer, userLocal);

  const passValue = {
    user: state,
    setUser: (user: User) => {
      setUserLocal(user);
      dispatch({ type: 'SET_USER', payload: user });
    },
    updateUser: (user: Partial<User>) => {
      setUserLocal(user);
      dispatch({ type: 'UPDATE_USER', payload: user });
    },
    removeUser: () => dispatch({ type: 'REMOVE_USER' }),
  };

  return (
    <UserContext.Provider value={passValue}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
