import WalletI from './Wallet.interface';
import { SignableMessage } from '@multiversx/sdk-core/out';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider';
import * as buffer from 'buffer';

window.Buffer = buffer.Buffer;
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
    const address = (this.address = await this.provider.login());

    if (this.address.length === 0) {
      throw new Error('Wallet extension is not available for connection');
    }

    return address;
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
      console.log(err);
      throw new Error('User denied message signature.');
    }
  }
}
