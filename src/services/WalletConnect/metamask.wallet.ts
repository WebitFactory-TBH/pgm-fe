import WalletI from './Wallet.interface';
import { Buffer } from 'buffer';

export enum Chains {
  '0x1' = 'Ethereum',
  '0x4' = 'Rinkeby',
  '0x61' = 'BSC Testnet'
}

export default class Metamask implements WalletI {
  window = window as any;
  walletAddr = '';

  isInstalled() {
    return this.window?.ethereum;
  }

  async checkConnection() {
    if (!this.isInstalled) return { error: 'no_metamask' };

    let accounts;
    try {
      accounts = await this.window.ethereum.request({ method: 'eth_accounts' });
    } catch (err) {
      console.error(err);
    }

    return !!accounts;
  }

  async init() {
    if (!this.isInstalled) throw new Error('Please install Metamask first.');
    let accounts;

    try {
      accounts = await this.window.ethereum.request({
        method: 'eth_requestAccounts'
      });
    } catch (err) {
      console.error(err);
      throw new Error('Metamask connection denied.');
    }

    // const chain = await this.window.ethereum.request({ method: 'eth_chainId' });
    // console.log(chain);

    this.initListeners();
    this.walletAddr = accounts[0];
    return accounts[0];
  }

  initListeners() {
    this.window.ethereum.on('chainChanged', (chainId: string) => {
      // TODO: handle this
      window.location.reload();
    });

    this.window.ethereum.on('accountsChanged', (accounts: any) => {
      // TODO: handle this
      window.location.reload();
    });

    this.window.ethereum.on('disconnect', () => {
      // TODO: handle this
      window.location.reload();
    });

    this.window.ethereum.on('message', (message: string) => {
      console.log(message);
    });
  }

  async signMessage(message: string) {
    const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;
    let signature;

    try {
      signature = await this.window.ethereum.request({
        method: 'personal_sign',
        params: [msg, this.walletAddr, 'Random text']
      });
    } catch (err) {
      throw new Error('User denied message signature.');
    }

    return signature;
  }
}
