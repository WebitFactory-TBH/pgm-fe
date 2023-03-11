import { ContractTypes } from '../types/ContractTypes';
import { WalletTypes } from '../types/WalletTypes';

export default function walletToContract(
  connector: WalletTypes
): ContractTypes {
  switch (connector) {
    case 'Metamask':
      return 'EthContract';
    case 'XPortal':
      return 'ElrondContract';
  }
}
