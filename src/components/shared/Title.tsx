import { PropsWithChildren } from 'react';

export default function Title({ children }: PropsWithChildren) {
  return (
    <div className="text-base font-bold text-xl text-gray-900">
      {children}
    </div>
  );
}
