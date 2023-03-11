import { PropsWithChildren } from 'react';

export default function Subtitle({ children }: PropsWithChildren) {
  return (
    <div className="text-base font-semibold text-lg text-gray-900">
      {children}
    </div>
  );
}
