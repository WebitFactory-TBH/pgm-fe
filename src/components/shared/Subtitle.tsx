import { PropsWithChildren } from 'react';

export default function Subtitle({ children }: PropsWithChildren) {
  return (
    <div className="text-base font-bold text-xs text-gray-500 uppercase tracking-wider">
      {children}
    </div>
  );
}
