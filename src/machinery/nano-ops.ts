import type {
  BlockInfo,
  PendingBlock,
  AccountBalanceResponse,
} from 'nano-rpc-fetch';
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
  loadBlocks,
  loadFrontiers,
  processSimple,
  resolveBalances,
} from './nano-rpc-fetch-wrapper';
import { signReceiveBlock, signSendBlock } from './nanocurrency-web-wrapper';

/** This file combines nanocurrency-web and nano-rpc-fetch */

const SEND_WORK = 'fffffff800000000';
const RECEIVE_WORK = 'fffffe0000000000';

export async function loadWalletData(account: NanoAccount): Promise<void> {
  const pending: {
    [key: string]: PendingBlock;
  } = await getPendingBlocksSimple([account.address]);
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
    pending[account.address],
    frontier,
    currentBalance
  );
}

async function resolvePendingForAccount(
  address: NanoAddress,
  privateKey: PrivateKey,
  publicKey: PublicKey,
  pendingBlock: PendingBlock,
  frontier: Frontier,
  currentBalance: RAW
): Promise<any> {
  /** TODO: Clean up this */
  const frontierOrPublicKey: Frontier | PublicKey =
    frontier && frontier !== '' ? frontier : publicKey;
  const frontierOrInitial: string =
    frontier && frontier !== ''
      ? frontier
      : '0000000000000000000000000000000000000000000000000000000000000000';
  const work: string = await generateWork(frontierOrPublicKey, RECEIVE_WORK);
  const block: SignedBlock = signReceiveBlock(
    address,
    privateKey,
    work,
    pendingBlock,
    frontierOrInitial,
    currentBalance
  );
  await processSimple(block);
}

export async function sendNano(
  account: NanoAccount,
  toAddress: NanoAddress,
  amount: RAW,
  balance: RAW
): Promise<void> {
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
      workHash
    );
    await processSimple(signed);
  } catch (error) {
    console.log(error);
  }
}

export async function updateWalletAccounts(
  wallet: NanoWallet
): Promise<NanoWallet> {
  const addresses = wallet.accounts.map((a) => a.address);
  const balances: {
    [address: string]: AccountBalanceResponse;
  } = await resolveBalances(addresses);
  wallet.accounts = wallet.accounts.map((a) => {
    return {
      ...a,
      balance: { raw: balances[a.address].balance.toString() },
    };
  });
  return wallet;
}
