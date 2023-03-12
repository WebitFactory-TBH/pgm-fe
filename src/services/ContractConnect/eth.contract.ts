import smartcontractAbiJson from '../../assets/eth.abi.json';
import { config } from '../../config';
import ContractConnectI from './Contract.interface';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

declare const ethereum: any;

interface Receiver {
  to: string;
  amount: number;
}

export default class EthContract implements ContractConnectI {
  contractAddress: string;
  contract: Contract | undefined;
  _web3: any;

  constructor(accountAddress: string) {
    if (config.ethContractAddress === 'undefined') {
      throw new Error('Contract address not found');
    }

    this._web3 = new Web3(ethereum);
    this._web3.eth.defaultAccount = accountAddress;

    this.contractAddress = config.ethContractAddress;
    this.contract = new this._web3.eth.Contract(
      smartcontractAbiJson,
      this.contractAddress
    );
  }

  createPaymentLink(data: { paymentId: string; receivers: Array<Receiver> }) {
    // DATA ARGUMENTS
    const convertedData = data.receivers.map((receiver) => {
      const amountAsBigNumber = this._web3.utils.toWei(
        receiver.amount.toString(),
        'ether'
      );
      // return [receiver.wallet, amountAsBigNumber];
      return {
        addr: receiver.to,
        amount: amountAsBigNumber
      };
    });

    // CREATE TRANSACTION
    // console.log('aici ajunge');

    // const encoded = this.contract?.methods
    //   .createPayment(convertedData, data.paymentId)
    //   .encodeABI();

    // console.log('aici nu mai ajunge');

    // var tx = {
    //   to: this.contractAddress,
    //   data: encoded,
    // };

    // // SIGN TRANSACTION
    // const signPromise = this._web3.eth.signTransaction(
    //   tx,
    //   this._web3.eth.defaultAccount
    // );

    // console.log({ signPromise });

    // SENT TRANSACTION
    // this._web3.eth.accounts.signTransaction(tx, privateKey).then((signed) => {
    //   this._web3.eth
    //     .sendSignedTransaction(signed.rawTransaction)
    //     .on('receipt', console.log);
    // });

    // NORMAL FLOW WITH FUNCTION CALL

    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this.contract?.methods
        .createPayment(convertedData, data.paymentId)
        .send(
          { from: _web3.eth.defaultAccount, value: 0 },
          function (err: any, result: any) {
            if (err != null) {
              reject(err);
            }

            console.log(result);
            resolve(result);
          }
        );
    }) as Promise<any>;
  }

  completePayment(paymentId: string) {
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this.contract?.methods
        .completePayment(paymentId)
        .send(
          { from: _web3.eth.defaultAccount },
          function (err: any, result: any) {
            if (err != null) {
              reject(err);
            }

            console.log(result);
            resolve(result);
          }
        );
    }) as Promise<boolean>;
  }

  cancelPayment(paymentId: string) {
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this.contract?.methods
        .cancelPayment(paymentId)
        .call(function (err: any, result: any) {
          if (err != null) {
            reject(err);
          }

          resolve(result);
          // resolve(_web3.utils.fromWei(result));
        });
    }) as Promise<boolean>;
  }
}
