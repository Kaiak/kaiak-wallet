import { SubType } from 'nano-rpc-fetch';
import type { SignedBlock } from 'nanocurrency-web/dist/lib/block-signer';
import type {
  Frontier,
  NanoAccount,
  NanoAddress,
  NanoWallet,
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

export async function loadAndResolveAccountData(
  account: NanoAccount
): Promise<NanoAccount> {
  try {
    const { frontier, representative, balance } = await accountInfo(
      account.address
    );
    account.representative = representative;
    account.balance = balance;
    const blocks: [hash: string, block: any][] = Object.entries(
      await getPending(account.address)
    );
    if (blocks.length > 0) {
      const [blockHash, { amount }] = blocks[0];
      await receiveBlock(account, frontier, blockHash, {
        raw: amount,
      });
      return loadAndResolveAccountData(account);
    }
    return account;
  } catch (e) {
    account.representative = account.representative || DEFAULT_REP;
    const blocks: [hash: string, block: any][] = Object.entries(
      await getPending(account.address)
    );
    if (blocks.length > 0) {
      const [blockHash, { amount }] = blocks[0];
      await receiveBlock(account, undefined, blockHash, {
        raw: amount,
      });
      return loadAndResolveAccountData(account);
    }
    return account;
  }
}

export async function receiveBlock(
  account: NanoAccount,
  frontier: Frontier | undefined,
  blockHash: string,
  amount: RAW | undefined
): Promise<void> {
  const work = await generateWork(frontier || account.publicKey, RECEIVE_WORK);
  const receiveBlock = signReceiveBlock(
    account.address,
    account.privateKey,
    work,
    frontier || OPEN_FRONTIER,
    account.balance || { raw: '0' },
    account.representative,
    blockHash,
    amount
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
