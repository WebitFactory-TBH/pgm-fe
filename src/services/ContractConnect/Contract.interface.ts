import { Address } from '@multiversx/sdk-core';

export default interface ContractConnectI {
  contractAddress: Address | string;
  contract: any;
  connectToContract: (...args: any) => void;
  createPaymentLink: () => void;
  completePayment: () => void;
  cancelPayment: () => void;
  getRequiredAmount: () => void;
}
