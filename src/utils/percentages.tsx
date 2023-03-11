export const percentageTo = (amount: number, percetage: number) => {
  return amount * (percetage / 100);
};

export const amountTo = (amount: number, from: number) => {
  return 100 * (amount / from);
};

export const checkAmount = (
  totalAmount: number,
  receivers: Array<{ amount: number }>,
  desiredAmount: number
) => {
  const receiversAmountSum = receivers.reduce((sum, currentReceiver) => {
    return sum + currentReceiver.amount;
  }, 0);

  if (receiversAmountSum + desiredAmount > totalAmount) {
    return false;
  }

  return true;
};
