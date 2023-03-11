import Title from '../components/shared/Title';

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
          amount: '1'
        }
      ]
    },
    {
      id: '123',
      blockchain: 'Ethereum',
      amount: 32,
      status: 'canceled',
      from: ''
    },
    {
      id: '123',
      blockchain: 'Ethereum',
      amount: 32,
      status: 'paid',
      from: '0xdksjaldajslkj12k313213'
    },
  ];
  return (
    <>
      <Title>Payments</Title>
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-[#f9f9f9] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-l-lg">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">$1999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">$99</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
              <th scope="row" className="px-6 py-3 text-base">
                Total
              </th>
              <td className="px-6 py-3">3</td>
              <td className="px-6 py-3">21,000</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
