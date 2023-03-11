export default function Icon({ type, ...props }: any) {
  switch (type) {
    case 'check':
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          {...props}
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      );
    default:
      return <></>;
  }
}
