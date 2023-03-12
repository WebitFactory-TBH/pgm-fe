import { Address, Transaction } from '@multiversx/sdk-core';

export default interface ContractConnectI {
  contractAddress: Address | string;
  contract: any;
  createPaymentLink: (data: any) => Promise<Transaction | any>;
  completePayment: (
    paymentId: any,
    walletAddress: string
  ) => Promise<Transaction | any>;
  cancelPayment: (payemntId: any) => Promise<any>;
}
