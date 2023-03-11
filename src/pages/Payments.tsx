import Title from '../components/shared/Title';
import { config } from '../config';

export default function Payments() {
  const payments = [
    {
      id: '123',
      blockchain: 'Ethereum',
      amount: 32,
      status: 'pending',
      from: '',
      receivers: [
        {
          wallet: '0xdsad213213',
          amount: '1',
        },
      ],
    },
    {
      id: '123',
      blockchain: 'Ethereum',
      amount: 32,
      status: 'canceled',
      from: '',
      receivers: [
        {
          wallet: '0xdsad213213',
          amount: '1',
        },
      ],
    },
    {
      id: '123',
      blockchain: 'Ethereum',
      amount: 32,
      status: 'paid',
      from: '0xdksjaldajslkj12k313213',
      receivers: [
        {
          wallet: '0xdsad213213',
          amount: '1',
        },
      ],
    },
  ];
  return (
    <>
      <Title>Payments</Title>
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-[#f9f9f9] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4 rounded-l-lg w-32">
                Id
              </th>
              <th scope="col" className="px-6 py-4">
                Blockchain
              </th>
              <th scope="col" className="px-6 py-4">
                Amount
              </th>
              <th scope="col" className="px-6 py-4 w-52">
                Status
              </th>
              <th scope="col" className="px-6 py-4 rounded-r-lg w-44">
                Payment link
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              return (
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {payment.id}
                  </th>
                  <td className="px-6 py-4">{payment.blockchain}</td>
                  <td className="px-6 py-4">{payment.amount}</td>
                  <td className={'px-6 py-4'}>
                    <div
                      className={
                        'rounded-3xl py-1 px-4 w-fit font-medium ' +
                        (payment.status == 'pending'
                          ? 'bg-gray-300'
                          : payment.status == 'canceled'
                          ? 'bg-red-200'
                          : 'bg-green-200')
                      }
                    >
                      {payment.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-blue-700 hover:underline">
                    <a
                      href={`${config.clientBase}payments/complete/${payment.id}`}
                      target="_blank"
                    >
                      Link
                    </a>
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
