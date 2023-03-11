import WalletI from './Wallet.interface';
import { SignableMessage } from '@multiversx/sdk-core/out';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider';
import { Buffer } from 'buffer';

export default class XPortal implements WalletI {
  provider: ExtensionProvider;
  address: string;

  constructor() {
    this.provider = ExtensionProvider.getInstance();
    this.address = '';
  }

  isInstalled() {
    // idk
    return true;
  }

  async init() {
    await this.provider.init();
    this.address = await this.provider.login();

    return this.address;
  }

  async checkConnection() {
    const isInit = this.provider.isInitialized();
    if (!isInit) {
      throw new Error('Extension wallet is not initialized');
    }

    const isConnected = await this.provider.isConnected();
    if (!isConnected) {
      return false;
    }

    return this.provider.getAddress();
  }

  async signMessage(message: string) {
    const signableMessage = new SignableMessage({
      message: Buffer.from(message)
    });

    try {
      await this.provider.signMessage(signableMessage);
      return true;
    } catch (err) {
      throw new Error('User denied message signature.');
    }
  }
}
