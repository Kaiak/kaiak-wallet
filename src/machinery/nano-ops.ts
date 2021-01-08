import { SubType } from 'nano-rpc-fetch';
import type { SignedBlock } from 'nanocurrency-web/dist/lib/block-signer';
import type {
  AccountInfo,
  BlockHash,
  Frontier,
  NanoAccount,
  NanoAddress,
  NanoWallet,
  PendingTransaction,
  RAW,
} from './models';
import {
  accountInfo,
  generateWork,
  getPending,
  loadFrontiers,
  processSimple,
  resolveBalance,
} from './nano-rpc-fetch-wrapper';
import {
  signReceiveBlock,
  signRepresentativeBlock,
  signSendBlock,
} from './nanocurrency-web-wrapper';

/** This file combines nanocurrency-web and nano-rpc-fetch */

const DEFAULT_REP: NanoAddress =
  'nano_3n7ky76t4g57o9skjawm8pprooz1bminkbeegsyt694xn6d31c6s744fjzzz';
let OPEN_FRONTIER =
  '0000000000000000000000000000000000000000000000000000000000000000';
const SEND_WORK = 'fffffff800000000';
const RECEIVE_WORK = 'fffffe0000000000';

/** Calls itself until transactions are pocketed */
export async function loadAndResolveAccountData(
  account: NanoAccount
): Promise<NanoAccount> {
  try {
    const info: AccountInfo | undefined = await accountInfo(account.address);
    // Account is open
    if (info) {
      account.representative = info.representative;
      account.balance = info.balance;
      const block: PendingTransaction | undefined = await getPending(
        account.address
      );
      console.log(block);
      if (block) {
        await receiveBlock(account, info.frontier, block);
        return loadAndResolveAccountData(account);
      }
      return account;
    } else {
      account.representative = account.representative || DEFAULT_REP;
      const pendingBlock: PendingTransaction | undefined = await getPending(
        account.address
      );
      if (pendingBlock) {
        await receiveBlock(account, info.frontier, pendingBlock);
        return loadAndResolveAccountData(account);
      }
      return account;
    }
  } catch (e) {
    // How to handle error?
    return account;
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
    account.balance || { raw: '0' },
    account.representative,
    pending.hash,
    pending.amount
  );
  await processSimple(receiveBlock, SubType.Receive);
}

export async function sendNano(
  account: NanoAccount,
  toAddress: NanoAddress,
  amount: RAW,
  balance: RAW
): Promise<NanoAccount | undefined> {
  try {
    const frontiers:
      | Map<string, Frontier>
      | { [key: string]: Frontier } = await loadFrontiers([account.address]);
    const frontier: Frontier | undefined = frontiers[account.address];
    const workHash: string = await generateWork(frontier, SEND_WORK);
    const signed: SignedBlock = signSendBlock(
      account.privateKey,
      balance,
      account.address,
      toAddress,
      frontier,
      amount,
      workHash,
      account.representative
    );
    await processSimple(signed, SubType.Send);
    return updateWalletAccount(account, account.representative);
  } catch (error) {
    console.log(error);
  }
}

export async function setRepresentative(account: NanoAccount): Promise<void> {
  try {
    const frontiers:
      | Map<string, Frontier>
      | { [key: string]: Frontier } = await loadFrontiers([account.address]);
    const frontier: Frontier | undefined = frontiers[account.address];
    const workHash: string = await generateWork(frontier, SEND_WORK);
    const signed: SignedBlock = signRepresentativeBlock(
      account.privateKey,
      account.balance,
      account.address,
      account.representative,
      frontier,
      workHash
    );
    await processSimple(signed, SubType.Change);
  } catch (e) {
    console.log(e);
  }
}

async function updateWalletAccount(
  account: NanoAccount,
  rep: NanoAddress
): Promise<NanoAccount> {
  const balance = await resolveBalance(account.address);
  return {
    ...account,
    balance: balance,
    representative: rep,
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
