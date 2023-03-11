import Icon from '../../assets/icons';
import { useWallet } from '../../context/wallet';
import WalletI from '../../services/WalletConnect/Wallet.interface';
import { WalletTypes } from '../../types/WalletTypes';
import { shortenHash } from '../../utils/shortenHash';
import Button from '../shared/Button';
import Text from '../shared/Text';
// import FeatherIcon from 'feather-icons-react';
import toast from 'react-hot-toast';

const wallets: WalletTypes[] = ['Metamask', 'XPortal'];

export default function ConnectedWallets() {
  const { connectWallet } = useWallet();

  const connectedWallets = [
    {
      name: 'Metamask',
      wallet: '0x4143123kl23kl112l3k1',
    },
  ];

  const linkWallet = async (walletType: WalletTypes) => {
    try {
      // 1. get wallet permissions
      const { walletAddress, wallet } = await connectWallet(walletType);

      // 2. make API call with walletAddr that returns message to sign
      const message = 'Message to sign';

      // 3. sign message
      const signedMessage = await (wallet as WalletI).signMessage(message);

      // 4. make API call to link account
    } catch (err) {
      console.error(err);
      toast.error((err as any).message);
    }
  };

  return (
    <>
      <Text>See list of linked accounts below.</Text>
      {wallets.map((wallet) => {
        return (
          <div
            key={wallet}
            className="w-100 bg-transparent text-gray-600 py-3 px-5 my-2 flex justify-between items-center transition-all rounded-md"
          >
            <div className="flex items-center w-auto font-semibold">
              <img className="h-7 mr-3 rounded-md" src={`/${wallet}.png`} />
              <Text>{wallet}</Text>
            </div>
            <div className="">
              {connectedWallets.find((el: any) => el.name === wallet) ? (
                <div>
                  <Icon
                    style={{ display: 'inline-block' }}
                    height="18"
                    type="check"
                  />
                  <Text style="font-semibold inline-block ml-2">Connected</Text>
                  <Text style="text-gray-400">
                    {shortenHash(connectedWallets[0].wallet)}
                  </Text>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    linkWallet(wallet);
                  }}
                  type="button"
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
