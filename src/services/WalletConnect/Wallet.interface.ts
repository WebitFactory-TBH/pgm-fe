import { Transaction } from '@multiversx/sdk-core/out';

export default interface WalletI {
  window?: any;
  isInstalled: () => boolean;
  init: () => void;
  signMessage: (message: string) => any;
  sendTransactionToSign: (tx: Transaction) => Promise<Transaction>;
}
