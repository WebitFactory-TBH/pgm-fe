import { Address } from '@multiversx/sdk-core';

export default interface ContractConnectI {
  contractAddress: Address | string;
  contract: any;
  createPaymentLink: (data: any) => void;
  completePayment: (payemntId: any) => void;
  cancelPayment: (payemntId: any) => void;
  getRequiredAmount: () => void;
}
