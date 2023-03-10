import ContractConnectI from './Contract.interface';
import {
  AbiRegistry,
  Address,
  SmartContract,
  SmartContractAbi,
} from '@multiversx/sdk-core';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';

interface AbiJSON {
  name: string;
  endpoints: any[];
  types: any;
}

export default class ElrondContract implements ContractConnectI {
  contractAddress: Address;
  contract: SmartContract;
  abiRegistry: SmartContractAbi;
  proxy: ProxyNetworkProvider;

  constructor(smartcontractAbiJson: AbiJSON) {
    if (typeof process.env.REACT_APP_ELROND_CONTRACT_ADDRESS === 'undefined') {
      throw new Error('Contract address not found');
    }

    if (typeof process.env.REACT_APP_ELROND_NETWORK_PROVIDER === 'undefined') {
      throw new Error('Network provider undefined');
    }
    this.contractAddress = new Address(
      process.env.REACT_APP_ELROND_CONTRACT_ADDRESS
    );

    this.abiRegistry = new SmartContractAbi(
      AbiRegistry.create(smartcontractAbiJson).remapToKnownTypes()
    );

    this.contract = new SmartContract({
      address: this.contractAddress,
      abi: this.abiRegistry,
    });

    this.proxy = new ProxyNetworkProvider(
      process.env.REACT_APP_ELROND_NETWORK_PROVIDER
    );
  }

  connectToContract() {}

  createPaymentLink() {}

  completePayment() {}

  cancelPayment() {}

  getRequiredAmount() {}
}
