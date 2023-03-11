import Icon from '../assets/icons';
import Button from '../components/shared/Button';
import Checkbox from '../components/shared/Checkbox';
import CustomBox from '../components/shared/CustomBox';
import Input from '../components/shared/Input';
import Subtitle from '../components/shared/Subtitle';
import Tabs from '../components/shared/Tabs';
import Title from '../components/shared/Title';
import { useUser } from '../context/user';
import { useWallet } from '../context/wallet';
import { ACTIONS, reducer } from '../reducers/payment.reducer';
import { amountTo, percentageTo } from '../utils/percentages';
import { ChangeEvent, useMemo, useReducer } from 'react';

export default function CreatePayment() {
  const { walletAddress } = useWallet();
  const { user } = useUser();
  const [state, dispatch] = useReducer(reducer, {
    receivers: [],
    amount: 0,
    invoice: false,
    business: false,
    businessData: {
      companyName: '',
      companyRegNo: ''
    },
    userData: {
      firstname: '',
      lastname: ''
    },
    billingAddress: ''
  });

  const remainingAmount = useMemo(() => {
    const receiversAmountSum = state.receivers.reduce(
      (sum, currentReceiver) => {
        return sum + currentReceiver.amount;
      },
      0
    );
    return amountTo(state.amount - receiversAmountSum, state.amount);
  }, [state]);

  const BussinessData = useMemo(
    () => () => {
      const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        dispatch({
          type: ACTIONS.UPDATE_BUSINESS_DATA,
          payload: {
            field: name,
            value
          }
        });
      };
      return (
        <div>
          <Input
            type='text'
            name='companyName'
            placeholder='Company name'
            defaultValue={state.businessData.companyName}
            onChange={onChange}
          />
          <Input
            type='text'
            name='companyRegNo'
            placeholder='Company registry number'
            defaultValue={state.businessData.companyRegNo}
            onChange={onChange}
          />
        </div>
      );
    },
    []
  );

  const UserData = useMemo(
    () => () => {
      const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        dispatch({
          type: ACTIONS.UPDATE_USER_DATA,
          payload: {
            field: name,
            value
          }
        });
      };
      return (
        <div>
          <Input
            type='text'
            name='firstname'
            placeholder='First name'
            defaultValue={state.userData.firstname}
            onChange={onChange}
          />
          <Input
            type='text'
            name='lastname'
            placeholder='Last name'
            defaultValue={state.userData.lastname}
            onChange={onChange}
          />
        </div>
      );
    },
    []
  );

  const Receiver = useMemo(
    () =>
      ({
        receiver,
        disabled = false
      }: {
        receiver: (typeof state.receivers)[0];
        disabled?: boolean;
      }) => {
        const onChange = (event: ChangeEvent<HTMLInputElement>) => {
          const { value, name } = event.target;
          dispatch({
            type: ACTIONS.UPDATE_RECEIVER,
            payload: {
              id: receiver.id,
              field: name,
              value:
                name === 'amount'
                  ? percentageTo(state.amount, Number(value))
                  : value
            }
          });
        };

        return (
          <div className='flex flex-row items-center w-full gap-4'>
            {!disabled && (
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
            )}
            <Input
              disabled={disabled}
              type='text'
              name='name'
              placeholder='Full name'
              defaultValue={receiver.name}
              onChange={onChange}
            />
            <Input
              disabled={disabled}
              type='text'
              name='address'
              placeholder='Wallet address'
              defaultValue={receiver.address}
              onChange={onChange}
            />
            <Input
              disabled={disabled}
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
    [state.amount]
  );
  console.log(state.invoice);
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
          <Checkbox
            placeholder='With invoice?'
            checked={state.invoice}
            onChange={(event) => {
              dispatch({
                type: ACTIONS.SET_INVOICE,
                payload: event.target.checked
              });
            }}
          />
        </div>
      </CustomBox>

      {/* receipt */}
      {state.invoice && (
        <CustomBox>
          <Tabs
            tabs={['Individual', 'Company']}
            setActiveTab={(tab) => {
              dispatch({
                type: ACTIONS.TOGGLE_BUSINESS,
                payload: Boolean(tab)
              });
            }}
            activeTab={+state.business}
          />
          {state.business ? <BussinessData /> : <UserData />}
          <Input
            type='text'
            name='billingAddress'
            placeholder='Billing address'
            defaultValue={state.billingAddress}
            onChange={(event) => {
              dispatch({
                type: ACTIONS.UPDATE_BILLING_ADDR,
                payload: event.target.value
              });
            }}
          />
        </CustomBox>
      )}

      {/* receivers */}
      <CustomBox>
        <Subtitle>Receivers</Subtitle>
        <div className='w-full flex flex-row justify-between items-center mt-4'>
          <div>
            <p>Undistributed amount: {remainingAmount.toFixed(2)}%</p>
            <p className='text-xs'>
              {percentageTo(state.amount, remainingAmount)} coins
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
          {state.receivers.length === 0 && (
            <Receiver
              receiver={{
                id: 0,
                address: walletAddress,
                amount: state.amount,
                name: user?.nickname ?? ''
              }}
              disabled={true}
            />
          )}
          {state.receivers.map((receiver) => (
            <Receiver receiver={receiver} key={receiver.id} />
          ))}
        </div>
      </CustomBox>
    </>
  );
}
