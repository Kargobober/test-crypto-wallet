export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}

export const formatAddress = (addr: string) => {
  return `${addr.substring(0, 8)}...`
}

/**
 * Получить число знаков после запятой для переданного числа
 */
export const getDecimalPlaces = (x: number) => {
  const myString = x.toString();

  if (myString.includes('.')) {
    return myString.split('.').pop()!.length;
  } else {
    return 0;
  }
};
