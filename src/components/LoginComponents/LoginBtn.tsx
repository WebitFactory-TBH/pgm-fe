import ConnectModal from './ConnectModal';
import { useState } from 'react';

export default function LoginBtn() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-gray-200 text-gray-600 font-bold py-2 px-4 rounded-full shadow flex hover:bg-gray-300 transition-all"
      >
        Login
      </button>
      
      <ConnectModal open={open} setOpen={setOpen} />
    </>
  );
}
