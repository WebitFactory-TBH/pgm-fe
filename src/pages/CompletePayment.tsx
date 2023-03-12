import API from '../api';
import Button from '../components/shared/Button';
import CustomBox from '../components/shared/CustomBox';
import Subtitle from '../components/shared/Subtitle';
import Title from '../components/shared/Title';
import { useContract } from '../context/contract';
import { useWallet } from '../context/wallet';
import ContractConnectI from '../services/ContractConnect/Contract.interface';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function CompletePayment() {
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<any>({});
  const [wallet, setWallet] = useState<any>();
  const { connectWallet } = useWallet();
  const { connectContract } = useContract();
  const params = useParams();

  const getPayment = async () => {
    const res = await API.post(`payment-links/data`, {
      paymentId: params.id,
    });
    console.log(res);

    setPayment(res.data);
  };

  const startPaymentProcess = async () => {
    setLoading(true);
    try {
      const { wallet, walletAddress } = await connectWallet('XPortal');
      setWallet(wallet);

      const contract = await connectContract('ElrondContract', walletAddress);

      try {
        const transaction = await (
          contract as ContractConnectI
        ).completePayment(payment.id, walletAddress);
        const signedTransaction = await wallet.sendTransactionToSign(
          transaction
        );

        const tx = await contract.broadcastTransaction(signedTransaction);
        console.log(tx);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    getPayment();
  }, []);

  return <></>;
  return (
    <>
      <Title>Complete payment</Title>
      <CustomBox style="flex items-center">
        <div className="flex-1">
          <Subtitle>Payment id: </Subtitle>
          <div className="mb-3 text-lg">{payment.id}</div>
          {/* <Subtitle>Blockchain: </Subtitle>
          <div className="mb-3 text-lg">{payment.blockchain}</div>
          <Subtitle>Amount: </Subtitle>
          <div className="mb-3 text-lg">{payment.amount} ETH</div> */}
        </div>

        <Button
          style={{ marginRight: '50px' }}
          onClick={startPaymentProcess}
          loading={loading}
        >
          Pay now
        </Button>
      </CustomBox>
    </>
  );
}
