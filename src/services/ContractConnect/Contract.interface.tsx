export default interface ContractConnectI {
  contractAddress: string;
  contract: any;
  connectToContract: (...args: any) => void;
}
