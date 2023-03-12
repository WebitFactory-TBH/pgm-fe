import { Address, Transaction } from '@multiversx/sdk-core';

export default interface ContractConnectI {
  contractAddress: Address | string;
  contract: any;
  createPaymentLink: (data: any) => Promise<Transaction>;
  completePayment: (
    payemntId: any,
    walletAddress: string
  ) => Promise<Transaction>;
  cancelPayment: (payemntId: any) => Promise<any>;
}
