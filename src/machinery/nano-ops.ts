import { SubType } from 'nano-rpc-fetch';
import type { SignedBlock } from 'nanocurrency-web/dist/lib/block-signer';
import type {
  AccountInfo,
  Frontier,
  NanoAccount,
  NanoAddress,
  NanoWallet,
  PendingTransaction,
  RAW,
  ResolvedAccount,
} from './models';
import {
  accountInfo,
  generateWork,
  getPending,
  process,
} from './nano-rpc-fetch-wrapper';
import {
  signReceiveBlock,
  signRepresentativeBlock,
  signSendBlock,
} from './nanocurrency-web-wrapper';

/** This file combines nanocurrency-web and nano-rpc-fetch */

export const DEFAULT_REP: NanoAddress =
  'nano_1kaiak5dbaaqpenb7nshqgq9tehgb5wy9y9ju9ehunexzmkzmzphk8yw8r7u';
let OPEN_FRONTIER =
  '0000000000000000000000000000000000000000000000000000000000000000';
const SEND_WORK = 'fffffff800000000';
const RECEIVE_WORK = 'fffffe0000000000';

/** Calls itself until transactions are pocketed */
export async function loadAndResolveAccountData(
  account: NanoAccount,
  resolvedCount: number = 0
): Promise<ResolvedAccount> {
  try {
    const info: AccountInfo | undefined = await accountInfo(account.address);
    // Set rep from account info, with fallback to cached and default
    account.representative =
      info?.representative || account.representative || DEFAULT_REP;
    // Use balance received
    account.balance = info?.balance || { raw: '0' };

    const block: PendingTransaction | undefined = await getPending(
      account.address
    );
    if (block) {
      await receiveBlock(account, info?.frontier, block);
      return loadAndResolveAccountData(account, resolvedCount + 1);
    }
    return {
      account,
      resolvedCount: resolvedCount,
    };
  } catch (e) {
    return {
      account,
      resolvedCount: resolvedCount,
      error: 'unable-to-fetch',
    };
  }
}

export async function receiveBlock(
  account: NanoAccount,
  frontier: Frontier | undefined,
  pending: PendingTransaction
): Promise<void> {
  const work = await generateWork(frontier || account.publicKey, RECEIVE_WORK);
  const receiveBlock = signReceiveBlock(
    account.address,
    account.privateKey,
    work,
    frontier || OPEN_FRONTIER,
    account.balance,
    account.representative,
    pending.hash,
    pending.amount
  );
  await process(receiveBlock, SubType.Receive);
}

export async function sendNano(
  account: NanoAccount,
  toAddress: NanoAddress,
  amount: RAW
): Promise<NanoAccount | undefined> {
  try {
    const info: AccountInfo | undefined = await accountInfo(account.address);
    if (info) {
      const workHash: string = await generateWork(info.frontier, SEND_WORK);
      const signed: SignedBlock = signSendBlock(
        account.privateKey,
        info.balance,
        account.address,
        toAddress,
        info.frontier,
        amount,
        workHash,
        info.representative
      );
      await process(signed, SubType.Send);
      return updateWalletAccount(account);
    } else {
      return account;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function setRepresentative(account: NanoAccount): Promise<void> {
  try {
    const info: AccountInfo | undefined = await accountInfo(account.address);
    if (info) {
      const workHash: string = await generateWork(info.frontier, SEND_WORK);
      const signed: SignedBlock = signRepresentativeBlock(
        account.privateKey,
        account.balance,
        account.address,
        account.representative,
        info.frontier,
        workHash
      );
      await process(signed, SubType.Change);
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

async function updateWalletAccount(account: NanoAccount): Promise<NanoAccount> {
  const info: AccountInfo | undefined = await accountInfo(account.address);
  return {
    ...account,
    balance: info.balance,
    representative: info.representative,
  };
}
/** Updates account in account list */
export function updateAccountInWallet(
  updatedAccount: NanoAccount,
  wallet: NanoWallet
): NanoWallet {
  wallet.accounts = wallet.accounts.map((account) => {
    return account.address === updatedAccount.address
      ? updatedAccount
      : account;
  });
  return wallet;
}
