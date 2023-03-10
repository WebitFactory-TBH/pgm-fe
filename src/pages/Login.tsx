import { useWallet, WalletTypes } from '../context/Wallet';
import { useUser } from '../context/user';
import WalletI from '../services/WalletConnect/Wallet.interface';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
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
    <div className="container h-screen flex">
      <div className="w-2/3 h-100 flex flex-wrap items-center justify-center">
        <img className="w-96" src="/login.svg" />
      </div>
      <div className="w-1/3 h-100 flex flex-wrap items-center justify-center flex-col text-neutral-800 dark:text-neutral-200">
        <div className="text-2xl font-extrabold mb-8">Log in</div>
        <button
          onClick={() => login('Metamask')}
          className="bg-gray-200 text-gray-600 font-bold py-3 px-5 rounded-full shadow flex hover:bg-gray-300 transition-all"
        >
          <img className="w-6 mr-2" src="/Metamask.png" />
          Connect with Metamask
        </button>
      </div>
    </div>
  );
}
