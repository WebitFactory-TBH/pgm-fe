import API from '../../api';
import { config } from '../../config';
import { useContract } from '../../context/contract';
import { useUser } from '../../context/user';
import { useWallet } from '../../context/wallet';
import useLocalStorage from '../../hooks/useLocalStorage';
import WalletI from '../../services/WalletConnect/Wallet.interface';
import { WalletTypes } from '../../types/WalletTypes';
import walletToContract from '../../utils/walletToContract';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface ConnectBtnI {
  walletType: WalletTypes;
}

export default function WalletConnectBtn({ walletType }: ConnectBtnI) {
  const { connectWallet } = useWallet();
  const { setUser } = useUser();
  const { connectContract } = useContract();
  const navigate = useNavigate();
  const [walletDataLocal, setWalletDataLocal] = useLocalStorage<any>(
    'walletData',
    null
  );

  const login = async (walletType: WalletTypes) => {
    try {
      // 1. get wallet permissions
      const { walletAddress, wallet } = await connectWallet(walletType);

      // 2. make API call to get token to sign
      const token = (
        await API.post('authentication/requestToken', {
          walletAddress,
        })
      ).data;

      // 3. sign and verify messagex
      const signature = await (wallet as WalletI).signMessage(token);
      const verification = await API.post('authentication/verifyToken', {
        token,
        signature,
      });

      if (verification.status !== 200) {
        throw new Error('Signature not valid.');
      }

      // 4. get user and save data
      let user = await API.get('users/data', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          token,
          signature,
        },
      });

      if (!user.data) {
        // create user
        await API.post('authentication/createAccount', {
          token,
          signature,
          chainId: config[`${walletType}ChainId`],
          nickname: 'Nickname',
          firstName: '',
          lastName: '',
          billingAddress: '',
          companyName: '',
          companyRegNo: '',
        });

        user = await API.get('users/data', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            token,
            signature,
          },
        });
      }

      setUser(user.data);
      setWalletDataLocal({ walletAddress, token, signature });

      // 5. connect to smart contract
      const contractType = walletToContract(walletType);
      connectContract(contractType, walletAddress);

      navigate('/payments');
    } catch (err) {
      console.error(err);
      toast.error((err as any).message);
    }
  };

  return (
    <div
      onClick={() => login(walletType)}
      className="cursor-pointer w-100 bg-transparent hover:bg-gray-100 text-gray-600 font-medium py-3 px-5 my-2 flex justify-between transition-all rounded-md"
    >
      {walletType}
      <img className="w-6 mr-2 rounded-md" src={`/${walletType}.png`} />
    </div>
  );
}
