import { PropsWithChildren } from 'react';

export default function Subtitle({ children }: PropsWithChildren) {
  return (
    <div className="text-base font-bold text-xs text-gray-400 uppercase tracking-wide">
      {children}
    </div>
  );
}
