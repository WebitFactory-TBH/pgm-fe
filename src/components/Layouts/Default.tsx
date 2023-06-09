import Navbar from '../Navbar';
import { PropsWithChildren } from 'react';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="container container-lg mx-auto min-h-screen pt-24">
      <Navbar />
      {children}
    </div>
  );
}
