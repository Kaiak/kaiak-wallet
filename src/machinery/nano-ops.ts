import type { BlockInfo, PendingBlock } from 'nano-rpc-fetch';
import type { SignedBlock } from 'nanocurrency-web/dist/lib/block-signer';
import type {
  Frontier,
  NANO,
  NanoAccount,
  NanoAddress,
  PrivateKey,
  PublicKey,
} from './models';
import {
  generateWork,
  getPendingBlocksSimple,
  loadBlocks,
  loadFrontiers,
  processSimple,
} from './nano-rpc-fetch-wrapper';
import {
  rawToNano,
  signReceiveBlock,
  signSendBlock,
} from './nanocurrency-web-wrapper';

/** This file combines nanocurrency-web and nano-rpc-fetch */

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
  const currentBalance: NANO = block
    ? rawToNano(block.balance)
    : { amount: '0' };
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
  currentBalance: NANO
): Promise<any> {
  /** TODO: Clean up this */
  const frontierOrPublicKey: Frontier | PublicKey =
    frontier && frontier !== '' ? frontier : publicKey;
  const frontierOrInitial: string =
    frontier && frontier !== ''
      ? frontier
      : '0000000000000000000000000000000000000000000000000000000000000000';
  const work: string = await generateWork(frontierOrPublicKey);
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
  amount: NANO,
  balance: NANO
): Promise<void> {
  try {
    const frontiers:
      | Map<string, Frontier>
      | { [key: string]: Frontier } = await loadFrontiers([account.address]);
    const frontier: Frontier | undefined = frontiers[account.address];
    const workHash: string = await generateWork(frontier);
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
