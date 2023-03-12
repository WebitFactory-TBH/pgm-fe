import smartcontractAbiJson from '../../assets/elrond.abi.json';
import { config } from '../../config';
import ContractConnectI from './Contract.interface';
import {
  AbiRegistry,
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  List,
  ResultsParser,
  SmartContract,
  SmartContractAbi,
  Tuple,
  TypedValue
} from '@multiversx/sdk-core';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import BigNumber from 'bignumber.js';

interface Receiver {
  wallet: string;
  amount: number;
}
// test data

export default class ElrondContract implements ContractConnectI {
  denomination: BigNumber;
  contractAddress: Address;
  contract: SmartContract;
  abiRegistry: SmartContractAbi;
  proxy: ProxyNetworkProvider;
  sender: Address;

  constructor(address: string) {
    if (typeof config.elrondContractAddress === 'undefined') {
      throw new Error('Contract address not found');
    }

    if (typeof config.elrondNetworkProvider === 'undefined') {
      throw new Error('Network provider undefined');
    }
    this.denomination = new BigNumber(10).pow(18);
    this.sender = new Address(address);

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

  private async sendScQuery(func: string, args?: Array<TypedValue>) {
    const query = this.contract.createQuery({
      func: new ContractFunction(func),
      args,
      caller: this.sender
    });

    const queryResponse = await this.proxy.queryContract(query);
    console.log(func, queryResponse);
    const endpoindDefinition = this.contract.getEndpoint(func);

    const { firstValue } = new ResultsParser().parseQueryResponse(
      queryResponse,
      endpoindDefinition
    );

    return {
      parsedResponse: firstValue,
      ...queryResponse
    };
  }

  async createPaymentLink(data: {
    paymentId: string;
    receivers: Array<Receiver>;
  }) {
    const convertedData = data.receivers.map((receiver) => {
      const amountAsBigNumber = new BigNumber(receiver.amount).multipliedBy(
        this.denomination
      );
      return Tuple.fromItems([
        new BigUIntValue(amountAsBigNumber),
        new AddressValue(new Address(receiver.wallet))
      ]);
    });

    const response = await this.sendScQuery('createPaymentLink', [
      BytesValue.fromUTF8(data.paymentId),
      List.fromItems(convertedData)
    ]);

    if (
      typeof response?.parsedResponse === 'undefined' &&
      response?.returnCode !== 'ok'
    ) {
      throw new Error(response?.returnMessage);
    }

    return response.parsedResponse;
  }

  async completePayment(payementId: string) {
    const response = await this.sendScQuery('completePayment', [
      BytesValue.fromUTF8(payementId)
    ]);

    if (typeof response?.parsedResponse === 'undefined') {
      throw new Error(response?.returnMessage);
    }

    return response.parsedResponse.valueOf();
  }

  async cancelPayment(payementId: string) {
    const response = await this.sendScQuery('cancelPayment', [
      BytesValue.fromUTF8(payementId)
    ]);

    if (typeof response?.parsedResponse === 'undefined') {
      throw new Error(response?.returnMessage);
    }

    return response.parsedResponse.valueOf();
  }
}
