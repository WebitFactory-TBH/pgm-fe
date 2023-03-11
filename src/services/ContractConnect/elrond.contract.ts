import smartcontractAbiJson from '../../assets/elrond.abi.json';
import { config } from '../../config';
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

  constructor() {
    if (typeof config.elrondContractAddress === 'undefined') {
      throw new Error('Contract address not found');
    }

    if (typeof config.elrondNetworkProvider === 'undefined') {
      throw new Error('Network provider undefined');
    }

    this.contractAddress = new Address(config.elrondContractAddress);

    this.abiRegistry = new SmartContractAbi(
      AbiRegistry.create(smartcontractAbiJson).remapToKnownTypes()
    );

    this.contract = new SmartContract({
      address: this.contractAddress,
      abi: this.abiRegistry,
    });

    this.proxy = new ProxyNetworkProvider(config.elrondNetworkProvider);
  }

  createPaymentLink() {}

  completePayment() {}

  cancelPayment() {}

  getRequiredAmount() {}
}
