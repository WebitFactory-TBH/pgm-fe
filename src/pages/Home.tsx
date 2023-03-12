import Text from '../components/shared/Text';
import Title from '../components/shared/Title';
import { useContract } from '../context/contract';
import { useEffect } from 'react';

export default function HomePage() {
  const { contract } = useContract();

  const createPayment = async () => {
    const res = await contract?.cancelPayment('randomidstring23113');
    console.log({ res });
  };

  useEffect(() => {
    if (contract) {
      console.log('apelam cancelPayment');
      // createPayment();
    }
  }, [contract]);

  return (
    <>
      <Title>Welcome to Pagament.io</Title>
      <Text>Please login to continue</Text>
    </>
  );
}
