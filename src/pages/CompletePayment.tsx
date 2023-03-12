import Button from '../components/shared/Button';
import CustomBox from '../components/shared/CustomBox';
import Subtitle from '../components/shared/Subtitle';
import Text from '../components/shared/Text';
import Title from '../components/shared/Title';
import { useContract } from '../context/contract';
import { useWallet } from '../context/wallet';
import ContractConnectI from '../services/ContractConnect/Contract.interface';
import { useState } from 'react';
import { useParams } from 'react-router';

const receivers = [
  {
    wallet: 'erd1v4723ex3trjydwqvla4f43wuu6xehhl8cgdufvawxm4httvtre6sgpvkzt',
    amount: 3.2
  },
  {
    wallet: 'erd1ht592jyxht5p6yrak97t3j6lvh7em4e6cy5rhaelau8x8gglazgqpr2xu2',
    amount: 2
  },
  {
    wallet: 'erd1mlgf0xxcnxp3kvcspz0q433cspjtxjfhjhxc9e40ct7y4rm2h4pqu50ypu',
    amount: 12
  },
  {
    wallet: 'erd1rdveq6u2h2aqs85g8a22e0dhffs0c9jzaj7gqh45ccre7w5nsqmswdln2l',
    amount: 0.00002232
  }
];

export default function CompletePayment() {
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [wallet, setWallet] = useState<any>();
  const { connectWallet } = useWallet();
  const { connectContract } = useContract();
  const params = useParams();

  const payment = {
    id: params.id,
    blockchain: 'Ethereum',
    amount: 24,
    receivers: ['1313123', 'dsadas32113']
  };

  const cancelPayment = async () => {
    setLoadingCancel(true);
    try {
      const contract = await connectContract('ElrondContract', '');
      await (contract as ContractConnectI).cancelPayment(payment.id);

      setLoadingCancel(false);
    } catch (err) {
      setLoadingCancel(false);
      console.error(err);
    }
  };

  const startPaymentProcess = async () => {
    setLoading(true);
    try {
      const { wallet, walletAddress } = await connectWallet('XPortal');
      setWallet(wallet);

      const contract = await connectContract('ElrondContract', walletAddress);

      try {
        await (contract as ContractConnectI).completePayment(payment.id);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const createMockPaymentLink = async () => {
    setLoading(true);
    try {
      const { wallet, walletAddress } = await connectWallet('XPortal');
      setWallet(wallet);

      const contract = await connectContract('ElrondContract', walletAddress);

      try {
        await (contract as ContractConnectI).createPaymentLink({
          paymentId: payment.id,
          receivers
        });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      <Title>Complete payment</Title>
      <CustomBox style='flex items-center'>
        <div className='flex-1'>
          <Subtitle>Payment id: </Subtitle>
          <div className='mb-3 text-lg'>{payment.id}</div>
          <Subtitle>Blockchain: </Subtitle>
          <div className='mb-3 text-lg'>{payment.blockchain}</div>
          <Subtitle>Amount: </Subtitle>
          <div className='mb-3 text-lg'>{payment.amount} ETH</div>
        </div>

        <Button
          style={{ marginRight: '50px' }}
          onClick={startPaymentProcess}
          loading={loading}
        >
          Pay now
        </Button>
        <Button
          style={{ marginRight: '50px' }}
          onClick={cancelPayment}
          loading={loadingCancel}
        >
          Cancel payment
        </Button>
        <Button
          style={{ marginRight: '50px' }}
          onClick={createMockPaymentLink}
          loading={loadingCancel}
        >
          Mock
        </Button>
      </CustomBox>
    </>
  );
}
