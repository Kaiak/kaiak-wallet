import type {BlockInfo, PendingBlock} from 'nano-rpc-fetch';
import type { SignedBlock } from 'nanocurrency-web/dist/lib/block-signer';
import type {NANO, NanoAccount, NanoAddress, NanoWallet, PrivateKey, PublicKey} from './models';
import {generateWork, getPendingBlocksSimple, loadBlocks, loadFrontiers, processSimple} from "./nano-rpc-fetch-wrapper";
import {rawToNano, signReceiveBlock} from "./nanocurrency-web-wrapper";

/** This file combines nanocurrency-web and nano-rpc-fetch */

export async function loadWalletData(account: NanoAccount): Promise<void> {
  const pending: { [key: string]: PendingBlock; } = await getPendingBlocksSimple([account.address])
  const frontiers: Map<string, string> | { [key: string]: string; } = await loadFrontiers([account.address]);
  const blocks: any = await loadBlocks(Object.values(frontiers))

  const frontier = frontiers[account.address];
  const block: BlockInfo | undefined = blocks[frontier];
  const currentBalance: NANO = block ? rawToNano(block.balance) : { amount: "0" };
  await resolvePendingForAccount(account.address, account.privateKey, account.publicKey, pending[account.address], frontier, currentBalance)
}

async function resolvePendingForAccount(
    address: NanoAddress,
    privateKey: PrivateKey,
    publicKey: PublicKey,
    pendingBlock: PendingBlock,
    frontier: string,
    currentBalance: NANO
): Promise<any> {
  const frontierOrPublicKey: string = frontier && frontier !== "" ? frontier : publicKey;
  console.log(frontierOrPublicKey)
  const frontierOrInitial: string = frontier && frontier !== "" ? frontier : "0000000000000000000000000000000000000000000000000000000000000000";
  const work: string = await generateWork(frontierOrPublicKey);
  const block: SignedBlock = signReceiveBlock(address, privateKey, work, pendingBlock, frontierOrInitial, currentBalance);
  await processSimple(block)
}
