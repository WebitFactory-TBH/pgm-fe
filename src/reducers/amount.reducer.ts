export interface Receiver {
  id: number;
  amount: number;
  address: string;
  name: string;
}

export interface State {
  amount: number;
  receivers: Array<Receiver>;
}

export enum ACTIONS {
  ADD_RECEIVER,
  UPDATE_RECEIVER,
  REMOVE_RECEIVER,
  SET_AMOUNT
}

export function reducer(state: State, action: any): State {
  switch (action.type) {
    case ACTIONS.SET_AMOUNT: {
      return {
        ...state,
        amount: action.payload
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

    default: {
      return state;
    }
  }
}
