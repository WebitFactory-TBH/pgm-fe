import Icon from '../assets/icons';
import Button from '../components/shared/Button';
import CustomBox from '../components/shared/CustomBox';
import Input from '../components/shared/Input';
import Subtitle from '../components/shared/Subtitle';
import Title from '../components/shared/Title';
import { ACTIONS, reducer } from '../reducers/amount.reducer';
import { amountTo, percentageTo } from '../utils/percentages';
import { ChangeEvent, useMemo, useReducer } from 'react';

export default function CreatePayment() {
  const [state, dispatch] = useReducer(reducer, {
    receivers: [],
    amount: 0
  });

  const remainingAmount = useMemo(() => {
    const receiversAmountSum = state.receivers.reduce(
      (sum, currentReceiver) => {
        return sum + currentReceiver.amount;
      },
      0
    );
    console.log(amountTo(state.amount - receiversAmountSum, state.amount));
    return amountTo(state.amount - receiversAmountSum, state.amount);
  }, [state]);

  const Receiver = useMemo(
    () =>
      ({ receiver }: { receiver: (typeof state.receivers)[0] }) => {
        const onChange = (event: ChangeEvent<HTMLInputElement>) => {
          const { value, name } = event.target;
          dispatch({
            type: ACTIONS.UPDATE_RECEIVER,
            payload: {
              id: receiver.id,
              field: name,
              value: name === 'amount' ? Number(value) : value
            }
          });
        };

        return (
          <div className='flex flex-row items-center w-full gap-4'>
            <div
              className='pb-4 cursor-pointer'
              onClick={() => {
                dispatch({
                  type: ACTIONS.REMOVE_RECEIVER,
                  payload: receiver.id
                });
              }}
            >
              <Icon type='x' stroke='#ff0000' />
            </div>
            <Input
              type='text'
              name='name'
              placeholder='Full name'
              defaultValue={receiver.name}
              onChange={onChange}
            />
            <Input
              type='text'
              name='address'
              placeholder='Wallet address'
              defaultValue={receiver.address}
              onChange={onChange}
            />
            <Input
              type='number'
              name='amount'
              min={0}
              max={100}
              placeholder='Amount (%)'
              defaultValue={amountTo(receiver.amount, state.amount)}
              onChange={onChange}
            />
          </div>
        );
      },
    []
  );

  return (
    <>
      <Title>Create payment</Title>
      <CustomBox>
        <Subtitle>payment config</Subtitle>
        <div className='mt-4'>
          <Input
            type='number'
            min='0'
            name='amount'
            placeholder='Amount'
            defaultValue={state.amount}
            onChange={(event) => {
              dispatch({
                type: ACTIONS.SET_AMOUNT,
                payload: Number(event.target.value ?? 0)
              });
            }}
          />
        </div>
      </CustomBox>
      <CustomBox>
        <Subtitle>Receivers</Subtitle>
        <div className='w-full flex flex-row justify-between items-center mt-4'>
          <div>
            <p>{remainingAmount.toFixed(2)}%</p>
            <p className='text-xs'>
              {percentageTo(state.amount, remainingAmount)}
            </p>
          </div>
          <Button
            disabled={state.amount === 0}
            onClick={() => {
              dispatch({
                type: ACTIONS.ADD_RECEIVER
              });
            }}
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Add receiver
          </Button>
        </div>
        <div className='flex flex-col gap-4 max-h-96 overflow-y-auto mt-4'>
          {state.receivers.map((receiver) => (
            <Receiver receiver={receiver} key={receiver.id} />
          ))}
        </div>
      </CustomBox>
    </>
  );
}
