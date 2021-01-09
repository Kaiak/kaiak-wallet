import type { NanoTransaction, NanoAddress, NanoAccount } from './models';
import { getLanguage } from './language';
import { rawToNano } from './nanocurrency-web-wrapper';
import dateFormat from 'dateformat';

export const transactionType = (transaction: NanoTransaction) => {
  switch (transaction.type) {
    case 'receive':
      return 'transaction-received';
    case 'send':
      return 'transaction-sent';
    default:
      return 'unknown';
  }
};

export const transactionReceived = (transaction: NanoTransaction) => {
  switch (transaction.type) {
    case 'receive':
      return 'transaction-received-at';
    case 'send':
      return 'transaction-sent-at';
    default:
      return 'unknown';
  }
};

export const direction = (transaction: NanoTransaction) => {
  switch (transaction.type) {
    case 'receive':
      return 'transaction-from';
    case 'send':
      return 'transaction-to';
    default:
      return 'unknown';
  }
};

export const transactionText = (transaction: NanoTransaction) => {
  return `${getLanguage(transactionType(transaction))} ${
    rawToNano(transaction.amount, 6).amount
  } ${getLanguage(direction(transaction))} ${truncateNanoAddress(
    transaction.account
  )}`;
};

export const transactionTime = (transaction: NanoTransaction) => {
  const date = new Date(Number(transaction.localTimestamp) * 1000);
  return `${getLanguage('at')} ${dateFormat(date)}`;
};

export function truncateNanoAddress(address: NanoAddress): string {
  return (
    address.substr(0, 9) +
    '.....' +
    address.substr(address.length - 5, address.length)
  );
}

export function accountAliasOrFallback(account: NanoAccount): string {
  return account.alias || 'unnamed-account';
}
