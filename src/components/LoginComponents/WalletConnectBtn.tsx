import { useUser } from '../../context/user';
import { useWallet } from '../../context/wallet';
import WalletI from '../../services/WalletConnect/Wallet.interface';
import { WalletTypes } from '../../types/WalletTypes';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface ConnectBtnI {
  walletType: WalletTypes;
}

export default function WalletConnectBtn({ walletType }: ConnectBtnI) {
  const { connectWallet } = useWallet();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const login = async (walletType: WalletTypes) => {
    try {
      // 1. get wallet permissions
      const { walletAddress, wallet } = await connectWallet(walletType);

      // 2. make API call with walletAddr that returns message to sign
      const message = 'Message to sign';

      // 3. sign message
      const signedMessage = await (wallet as WalletI).signMessage(message);

      // 4. save message and signedMessage to localStorage

      // 5. get user and save to context
      const user = {
        id: '312321',
        nickname: 'crsssss',
      };

      setUser(user);
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error((err as any).message);
    }
  };

  return (
    <button
      onClick={() => login(walletType)}
      className="w-100 bg-transparent hover:bg-gray-100 text-gray-600 font-bold py-2 px-4 rounded-full shadow flex justify-between transition-all"
    >
      <img className="w-6 mr-2" src={`/${walletType}.png`} />
      {walletType}
    </button>
  );
}
