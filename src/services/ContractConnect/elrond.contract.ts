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
  TokenPayment,
  Transaction,
  TransactionPayload,
  Tuple,
  TypedValue
} from '@multiversx/sdk-core';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import BigNumber from 'bignumber.js';

interface Receiver {
  to: string;
  amount: string;
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

  async broadcastTransaction(tx: Transaction) {
    const transaction = await this.proxy.sendTransaction(tx);
    return transaction;
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
        new AddressValue(new Address(receiver.to))
      ]);
    });

    const transactionPayload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction('createPaymentLink'))
      .addArg(BytesValue.fromUTF8(data.paymentId))
      .addArg(List.fromItems(convertedData))
      .build();
    const nonce = (await this.proxy.getAccount(this.sender)).nonce;

    const transaction = new Transaction({
      nonce,
      receiver: this.contractAddress,
      sender: this.sender,
      chainID: 'D',
      value: TokenPayment.egldFromAmount(0),
      data: transactionPayload,
      gasLimit: config.elrondGas
    });

    return transaction;
  }

  async completePayment(paymentId: string, walletAddress: string) {
    const response = await this.sendScQuery('getRequiredAmount', [
      BytesValue.fromUTF8(paymentId)
    ]);

    if (typeof response?.parsedResponse === 'undefined') {
      throw new Error(response?.returnMessage);
    }

    const transactionPayload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction('completePayment'))
      .addArg(BytesValue.fromUTF8(paymentId))
      .build();
    const nonce = (await this.proxy.getAccount(this.sender)).nonce;

    const transaction = new Transaction({
      nonce,
      receiver: this.contractAddress,
      sender: new Address(walletAddress),
      chainID: 'D',
      value: TokenPayment.egldFromBigInteger(response.parsedResponse.valueOf()),
      data: transactionPayload,
      gasLimit: config.elrondGas
    });

    return transaction;
  }

  async cancelPayment(paymentId: string) {
    const transactionPayload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction('cancelPayment'))
      .addArg(BytesValue.fromUTF8(paymentId))
      .build();
    const nonce = (await this.proxy.getAccount(this.sender)).nonce;

    const transaction = new Transaction({
      nonce,
      receiver: this.contractAddress,
      sender: this.sender,
      chainID: 'D',
      value: TokenPayment.egldFromAmount(0),
      data: transactionPayload,
      gasLimit: config.elrondGas
    });

    return transaction;
  }
}
