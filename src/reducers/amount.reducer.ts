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
  UPDATE_RECEIVER
}

export function reducer(state: State, action: any): State {
  switch (action.type) {
    case ACTIONS.ADD_RECEIVER: {
      // payload must have a new amount percentage and wallet address

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

    default: {
      return state;
    }
  }
}
