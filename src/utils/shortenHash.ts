export const shortenHash = (address: string, charsAmount = 6) => {
  if (typeof address === 'undefined') return '';
  const firstPart = address.substring(0, charsAmount);
  const lastPart = address.substring(
    address.length - charsAmount,
    address.length
  );
  return `${firstPart}...${lastPart}`;
};
