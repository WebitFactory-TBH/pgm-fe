export interface Receiver {
  id: number;
  amount: number;
  address: string;
  name: string;
}

export interface BusinessData {
  companyName: string;
  companyRegNo: string;
}

export interface UserData {
  firstname: string;
  lastname: string;
}

export interface State {
  amount: number;
  receivers: Array<Receiver>;
  invoice: boolean;
  business: boolean;
  businessData: BusinessData;
  userData: UserData;
  billingAddress: string;
  paymentId: '';
}

export enum ACTIONS {
  ADD_RECEIVER,
  UPDATE_RECEIVER,
  REMOVE_RECEIVER,
  SET_AMOUNT,
  SET_INVOICE,
  TOGGLE_BUSINESS,
  UPDATE_BUSINESS_DATA,
  UPDATE_USER_DATA,
  UPDATE_BILLING_ADDR,
  UPDATE_PAYMENT_ID
}

export function reducer(state: State, action: any): State {
  switch (action.type) {
    case ACTIONS.SET_AMOUNT: {
      return {
        ...state,
        amount: action.payload
      };
    }

    case ACTIONS.SET_INVOICE: {
      return {
        ...state,
        invoice: action.payload
      };
    }

    case ACTIONS.TOGGLE_BUSINESS: {
      return {
        ...state,
        business: action.payload
      };
    }

    case ACTIONS.ADD_RECEIVER: {
      return {
        ...state,
        receivers: [
          ...state.receivers,
          {
            id: state.receivers.length,
            name: '',
            address: '',
            amount: 0
          }
        ]
      };
    }

    case ACTIONS.UPDATE_RECEIVER: {
      return {
        ...state,
        receivers: state.receivers.map((receiver) => {
          if (receiver.id === action.payload.id) {
            return {
              ...receiver,
              [action.payload.field]: action.payload.value
            };
          }

          return receiver;
        })
      };
    }

    case ACTIONS.REMOVE_RECEIVER: {
      return {
        ...state,
        receivers: state.receivers.filter(
          (receiver) => receiver.id !== action.payload
        )
      };
    }

    case ACTIONS.UPDATE_BUSINESS_DATA: {
      return {
        ...state,
        businessData: {
          ...state.businessData,
          [action.payload.field]: action.payload.value
        }
      };
    }

    case ACTIONS.UPDATE_USER_DATA: {
      return {
        ...state,
        userData: {
          ...state.userData,
          [action.payload.field]: action.payload.value
        }
      };
    }

    case ACTIONS.UPDATE_BILLING_ADDR: {
      return {
        ...state,
        billingAddress: action.payload
      };
    }

    case ACTIONS.UPDATE_PAYMENT_ID: {
      return {
        ...state,
        paymentId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
