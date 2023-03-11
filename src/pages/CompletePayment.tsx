import CustomBox from '../components/shared/CustomBox';
import Subtitle from '../components/shared/Subtitle';
import Text from '../components/shared/Text';
import Title from '../components/shared/Title';
import { useParams } from 'react-router';

export default function CompletePayment() {
  const params = useParams();

  const payment = {
    id: params.id,
    blockchain: 'Ethereum',
    amount: 24,
    receivers: ['1313123', 'dsadas32113'],
  };

  return (
    <>
      <Title>Complete payment</Title>
      <CustomBox>
        <Subtitle>Payment id: </Subtitle>
        <div className="mb-3 text-lg">{payment.id}</div>
        <Subtitle>Blockchain: </Subtitle>
        <div className="mb-3 text-lg">{payment.blockchain}</div>
        <Subtitle>Amount: </Subtitle>
        <div className="mb-3 text-lg">{payment.amount} ETH</div>
      </CustomBox>
    </>
  );
}
