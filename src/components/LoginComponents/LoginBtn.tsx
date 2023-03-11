import ConnectModal from './ConnectModal';
import { useState } from 'react';

export default function LoginBtn() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all"
      >
        Login or register
      </button>

      <ConnectModal open={open} setOpen={setOpen} />
    </>
  );
}
