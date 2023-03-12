import { Address } from '@multiversx/sdk-core';

export default interface ContractConnectI {
  contractAddress: Address | string;
  contract: any;
  createPaymentLink: (data: any) => Promise<any>;
  completePayment: (payemntId: any) => Promise<any>;
  cancelPayment: (payemntId: any) => Promise<any>;
}
