import API from '../api';
import api from '../api';
import Button from '../components/shared/Button';
import Subtitle from '../components/shared/Subtitle';
import Title from '../components/shared/Title';
import { config } from '../config';
import { useContract } from '../context/contract';
import { useWallet } from '../context/wallet';
import { callPdfService } from '../utils/callServices';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Payments() {
  const [loading, setLoading] = useState<boolean>(false);
  const [payments, setPayments] = useState<any>([]);
  const { contract, connectContract } = useContract();
  const { walletAddress } = useWallet();

  const cancelPayment = async (paymentId: string) => {
    setLoading(true);
    try {
      const contractInstance =
        contract || (await connectContract('EthContract', walletAddress));

      await contractInstance?.cancelPayment(paymentId);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error((err as any).message);
    }
  };

  const download = async (payment: any) => {
    const sourceData = await callPdfService({
      identifier: 'paymentId',
      created_at: '2023-03-12',
      due_date: '2023-03-12',
      from_name: 'WebitFactory',
      from_address: 'Cretei 14, Bucharest',
      from_wallet_address: '0xc1E7382dAe17B9fF3E6df3263E75daB760595FAc',
      bc_name: 'Ethereum',
      payment_amount: 1.23,
      coin_symbol: 'eth',
      receivers: [
        {
          address: '0xc1E7382dAe17B9fF3E6df3263E75daB760595FAc',
          amount: 1
        },
        {
          address: '0xc1E7382dAe17B9fF3E6df3263E75daB760595FAc',
          amount: 0.23
        }
      ]
    });

    try {
      const downloadLink = document.createElement('a');
      const fileName = `${payment.id}.pdf`;

      downloadLink.href = sourceData;
      downloadLink.download = fileName;
      downloadLink.click();
    } catch (err) {
      console.log(err);
    }
  };

  const getPayments = async () => {
    const rez = await API.get('users/payments');
    setPayments(rez.data);
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <div className='flex justify-between'>
        <Title>Payments</Title>
        <Link to='/payments/create'>
          <Button>Create payment</Button>
        </Link>
      </div>
      <div className='relative overflow-x-auto mt-5'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-[#f9f9f9] dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-4 rounded-l-lg w-32'>
                Id
              </th>
              {/* <th scope="col" className="px-6 py-4">
                Blockchain
              </th>
              <th scope='col' className='px-6 py-4'>
                Amount
              </th> */}
              <th scope='col' className='px-6 py-4 w-44'>
                Payment link
              </th>
              <th scope='col' className='px-6 py-4 w-44 text-right'>
                Status
              </th>
              <th
                scope='col'
                className='px-6 py-4 rounded-r-lg w-52 text-right'
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!payments.length && <Subtitle>No payments</Subtitle>}
            {payments.map((payment: any) => {
              return (
                <tr key={payment.id} className='bg-white dark:bg-gray-800'>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {payment.id}
                  </th>
                  {/* <td className="px-6 py-4">{payment.blockchain}</td>
                  <td className="px-6 py-4">{payment.amount}</td> */}
                  <td className='px-6 py-4 text-blue-700 hover:underline'>
                    <a
                      href={`${config.clientBase}payments/complete/${payment.id}`}
                      target='_blank'
                    >
                      Link
                    </a>
                  </td>
                  <td className={'px-6 py-4'}>
                    <div
                      className={
                        'rounded-3xl py-1 px-4 w-fit font-medium ml-auto ' +
                        (payment.status === 'pending'
                          ? 'bg-gray-300'
                          : payment.status === 'canceled'
                          ? 'bg-red-200'
                          : 'bg-green-200')
                      }
                    >
                      {payment.status}
                    </div>
                  </td>

                  <td className='px-6 py-4 flex justify-end items-center'>
                    <div
                      onClick={() => download(payment.id)}
                      className='mr-2 text-sm text-blue-600 cursor-pointer'
                    >
                      Invoice
                    </div>
                    <Button
                      onClick={() => cancelPayment(payment)}
                      loading={loading}
                    >
                      Cancel payment
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
