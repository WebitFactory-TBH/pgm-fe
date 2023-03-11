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

      // 6. connect to smart contract
      const contractType = walletToContract(walletType);
      connectContract(contractType, walletAddress);

      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error((err as any).message);
    }
  };

  return (
    <div
      onClick={() => login(walletType)}
      className="w-100 bg-transparent hover:bg-gray-100 text-gray-600 font-bold py-3 px-5 my-2 flex justify-between transition-all rounded-md"
    >
      {walletType}
      <img className="w-6 mr-2 rounded-md" src={`/${walletType}.png`} />
    </div>
  );
}
