import { useWallet, WalletTypes } from '../context/Wallet';
import WalletI from '../services/WalletConnect/Wallet.interface';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { connectWallet } = useWallet();
  const navigate = useNavigate();

  const login = async (walletType: WalletTypes) => {
    try {
      // 1. get wallet permissions
      const { walletAddress, wallet } = await connectWallet(walletType);
      console.log({ walletAddress });

      // 2. make API call with walletAddr that returns message to sign
      const message = 'Message to sign';

      // 3. sign message
      const signedMessage = await (wallet as WalletI).signMessage(message);

      // 4. save message and signedMessage to localStorage

      // navigate('/');
    } catch (err) {
      console.error(err);
      toast.error((err as any).message);
    }
  };

  return (
    <div className="container g-6 flex h-screen flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
      <button
        onClick={() => login('Metamask')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Connect with Metamask
      </button>
    </div>
  );
}
