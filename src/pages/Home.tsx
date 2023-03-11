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

  return <>Home page</>;
}
