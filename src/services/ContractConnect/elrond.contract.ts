import smartcontractAbiJson from '../../assets/elrond.abi.json';
import { config } from '../../config';
import ContractConnectI from './Contract.interface';
import {
  AbiRegistry,
  Address,
  ContractFunction,
  ResultsParser,
  SmartContract,
  SmartContractAbi
} from '@multiversx/sdk-core';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';

interface Options {
  args?: any;
  sender: string;
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
      abi: this.abiRegistry
    });

    this.proxy = new ProxyNetworkProvider(config.elrondNetworkProvider);
  }

  private async sendScQuery(func: string, options: Options) {
    const query = this.contract.createQuery({
      func: new ContractFunction(func),
      args: [...options.args],
      caller: new Address(options.sender)
    });

    const queryResponse = await this.proxy.queryContract(query);
    const endpoindDefinition = this.contract.getEndpoint(func);

    const { firstValue } = new ResultsParser().parseQueryResponse(
      queryResponse,
      endpoindDefinition
    );
    return firstValue?.valueOf();
  }

  createPaymentLink(sender: string) {
    return this.sendScQuery('createPaymentLink', {
      sender
    });
  }

  completePayment() {}

  cancelPayment() {}

  getRequiredAmount() {}
}
