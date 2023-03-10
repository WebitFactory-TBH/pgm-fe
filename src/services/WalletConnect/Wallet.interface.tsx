export default interface WalletI {
  window: any;
  isInstalled: () => boolean;
  init: () => void;
  signMessage: (message: string) => any;
}