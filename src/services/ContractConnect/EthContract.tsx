import ContractConnectI from './Contract.interface';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

declare const ethereum: any;

export default class EthContract implements ContractConnectI {
  contractAddress: string;
  contract: Contract | undefined;
  _web3: any;

  constructor() {
    this.contractAddress = process.env.REACT_APP_ETH_CONTRACT_ADDRESS as string;
    this._web3 = new Web3(ethereum);
  }

  connectToContract(accountAddress: string) {
    this._web3.eth.defaultAccount = accountAddress;
  }
}
