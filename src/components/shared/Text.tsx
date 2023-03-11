import { PropsWithChildren } from 'react';

interface TextPropsI extends PropsWithChildren {
  style?: string;
}

export default function Text({ children, style }: TextPropsI) {
  return <div className={'text-sm ' + style}>{children}</div>;
}
