import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  type: string;
}

export default function Icon({ type, ...props }: Props) {
  switch (type) {
    case 'check':
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='black'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          {...props}
        >
          <polyline points='20 6 9 17 4 12'></polyline>
        </svg>
      );

    case 'x': {
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='black'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          {...props}
        >
          <line x1='18' y1='6' x2='6' y2='18' />
          <line x1='6' y1='6' x2='18' y2='18' />
        </svg>
      );
    }
    default:
      return <></>;
  }
}
