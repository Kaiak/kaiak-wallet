import type { BlockInfo, PendingBlock } from 'nano-rpc-fetch';
import type { SignedBlock } from 'nanocurrency-web/dist/lib/block-signer';
import type {
  Frontier,
  NanoAccount,
  NanoAddress,
  NanoWallet,
  PrivateKey,
  PublicKey,
  RAW,
} from './models';
import {
  generateWork,
  getPendingBlocksSimple,
  getRepresentative,
  loadBlocks,
  loadFrontiers,
  processSimple,
  resolveBalance,
} from './nano-rpc-fetch-wrapper';
import {
  signReceiveBlock,
  signRepresentativeBlock,
  signSendBlock,
} from './nanocurrency-web-wrapper';
import { SubType } from 'nano-rpc-fetch';

/** This file combines nanocurrency-web and nano-rpc-fetch */

const SEND_WORK = 'fffffff800000000';
const RECEIVE_WORK = 'fffffe0000000000';

export async function loadAndResolveAccountData(
  account: NanoAccount
): Promise<NanoAccount> {
  const pending: {
    [key: string]: PendingBlock;
  } = await getPendingBlocksSimple([account.address]);

  // TODO: Get representative + balance can be replaes with account_info

  const representative = await getRepresentative(account.address);
  const pendingBlock: PendingBlock = pending[account.address];
  if (pendingBlock) {
    const frontiers:
      | Map<string, Frontier>
      | { [key: string]: Frontier } = await loadFrontiers([account.address]);
    const blocks: { [key: string]: BlockInfo } = await loadBlocks(
      Object.values(frontiers)
    );

    const frontier: Frontier | undefined = frontiers[account.address];
    const block: BlockInfo | undefined = blocks[frontier];

    const currentBalance: RAW = block
      ? { raw: block.balance.toString() }
      : { raw: '0' };
    await resolvePendingForAccount(
      account.address,
      account.privateKey,
      account.publicKey,
      pendingBlock,
      frontier,
      currentBalance,
      representative
    );
  }

  const updatedWallet = await updateWalletAccount(account);
  updatedWallet.representative = representative;
  return updatedWallet;
}

async function resolvePendingForAccount(
  address: NanoAddress,
  privateKey: PrivateKey,
  publicKey: PublicKey,
  pendingBlock: PendingBlock,
  frontier: Frontier,
  currentBalance: RAW,
  representative: NanoAddress | undefined
): Promise<any> {
  /** TODO: Clean up this */
  const frontierOrPublicKey: Frontier | PublicKey =
    frontier && frontier !== '' ? frontier : publicKey;
  const frontierOrInitial: string =
    frontier && frontier !== ''
      ? frontier
      : '0000000000000000000000000000000000000000000000000000000000000000';
  const work: string = await generateWork(frontierOrPublicKey, RECEIVE_WORK);

  const pendingBlocks: any[] = Object.keys(pendingBlock);
  if (pendingBlocks.length > 0) {
    const block: SignedBlock = signReceiveBlock(
      address,
      privateKey,
      work,
      pendingBlock,
      frontierOrInitial,
      currentBalance,
      representative
    );
    await processSimple(block, SubType.Receive);
  } else {
    return;
  }
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
    return updateWalletAccount(account);
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

async function updateWalletAccount(account: NanoAccount): Promise<NanoAccount> {
  const balance = await resolveBalance(account.address);
  return {
    ...account,
    balance: balance,
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
