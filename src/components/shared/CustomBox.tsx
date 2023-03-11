import { PropsWithChildren } from 'react';

interface CustomBoxI extends PropsWithChildren {
  style?: string;
}

export default function CustomBox({ children, style = '' }: CustomBoxI) {
  return (
    <div className={'bg-[#F9F9F9] py-7 px-10 rounded-xl my-2 ' + style}>
      {children}
    </div>
  );
}
