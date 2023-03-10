export default interface ContractConnectI {
  contractAddress: string;
  contract: any;
  connectToContract: (...args: any) => void;
  createPaymentLink: () => void;
  completePayment: () => void;
  cancelPayment: () => void;
  getRequiredAmount: () => void;
}
