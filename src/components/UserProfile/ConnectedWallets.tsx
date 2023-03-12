import API from '../../api';
import Icon from '../../assets/icons';
import { config } from '../../config';
import { useUser } from '../../context/user';
import { useWallet } from '../../context/wallet';
import WalletI from '../../services/WalletConnect/Wallet.interface';
import { WalletTypes } from '../../types/WalletTypes';
import { shortenHash } from '../../utils/shortenHash';
import Button from '../shared/Button';
import Text from '../shared/Text';
import { useEffect, useState } from 'react';
// import FeatherIcon from 'feather-icons-react';
import toast from 'react-hot-toast';

const wallets: WalletTypes[] = ['Metamask', 'XPortal'];

export default function ConnectedWallets() {
  const { connectWallet } = useWallet();
  const { user, setUser } = useUser();
  const [connectedWallets, setConnectedWallets] = useState<any>([]);

  const linkWallet = async (walletType: WalletTypes) => {
    try {
      // 1. get wallet permissions
      const { walletAddress, wallet } = await connectWallet(walletType);

      // 2. make API call with walletAddr that returns message to sign
      const token = (
        await API.post('authentication/requestToken', {
          walletAddress,
        })
      ).data;

      // 3. sign message
      const signature = await (wallet as WalletI).signMessage(token);
      const verification = await API.post('authentication/verifyToken', {
        token,
        signature,
      });

      if (verification.status != 200) {
        throw new Error('Signature not valid.');
      }

      // 4. make API call to link account
      const response = API.post(
        'users/link-wallet',
        {
          chainId: config[`${walletType}ChainId`],
          userId: user?.id,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            token,
            signature,
          },
        }
      );

      const user2 = await API.get('users/data', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          token,
          signature,
        },
      });

      setUser(user2.data);
    } catch (err) {
      console.error(err);
      toast.error((err as any).message);
    }
  };

  useEffect(() => {
    if (!user) return;
    console.log(user);
    const tmp: any = [];
    user?.wallets.forEach((wallet: any) => {
      if (wallet.address.includes('0x')) {
        tmp.push({
          name: 'Metamask',
          wallet: wallet.address,
        });
      } else {
        tmp.push({
          name: 'XPortal',
          wallet: wallet.address,
        });
      }
    });

    setConnectedWallets(tmp);
  }, [user]);

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
                    {shortenHash(
                      connectedWallets.find((el: any) => el.name === wallet)
                        .wallet
                    )}
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
