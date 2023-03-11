import { PropsWithChildren } from 'react';

interface CustomBoxI extends PropsWithChildren {
  style?: string;
}

export default function CustomBox({ children, style = '' }: CustomBoxI) {
  return (
    <div className={'bg-gray-100 py-7 px-10 rounded-xl my-2 shadow ' + style}>
      {children}
    </div>
  );
}
