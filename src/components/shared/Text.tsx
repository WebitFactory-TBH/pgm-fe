import { PropsWithChildren } from 'react';

export default function Text({ children }: PropsWithChildren) {
  return <div className="text-base text-gray-700 text-sm">{children}</div>;
}
