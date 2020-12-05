import type { NANO, NanoAddress, NanoTransaction, Frontier } from './models';
import {
  AccountBalanceRequestActionEnum,
  AccountBalanceResponse,
  AccountHistoryRequestActionEnum,
  AccountHistoryResponse,
  AccountsFrontiersRequestActionEnum,
  AccountsPendingRequestActionEnum,
  BlocksInfoRequestActionEnum,
  Configuration,
  ModelBoolean,
  NodeRPCsApi,
  ProcessRequestActionEnum,
  ProcessResponse,
  WorkGenerateRequestActionEnum,
} from 'nano-rpc-fetch';
import type { BlockInfo, PendingBlock } from 'nano-rpc-fetch/models/index';
import { rawToNano } from './nanocurrency-web-wrapper';

const nanoApi = new NodeRPCsApi(
  new Configuration({
    basePath: 'https://nano.mehl.no/node',
  })
);

export async function resolveBalance(address: NanoAddress): Promise<NANO> {
  let balance: AccountBalanceResponse = await nanoApi.accountBalance({
    accountBalanceRequest: {
      action: AccountBalanceRequestActionEnum.AccountBalance,
      account: address,
    },
  });
  return rawToNano(balance.balance, 5);
}

export function processSimple(block: any): Promise<ProcessResponse> {
  return nanoApi.process({
    processRequest: {
      action: ProcessRequestActionEnum.Process,
      block: block,
      jsonBlock: ModelBoolean.True,
    },
  });
}

export async function generateWork(frontier: string): Promise<string> {
  return nanoApi
    .workGenerate({
      workGenerateRequest: {
        action: WorkGenerateRequestActionEnum.WorkGenerate,
        hash: frontier,
      },
    })
    .then((hash) => hash.work);
}

export async function resolveHistory(
  address: NanoAddress
): Promise<NanoTransaction[]> {
  let history: AccountHistoryResponse = await nanoApi.accountHistory({
    accountHistoryRequest: {
      action: AccountHistoryRequestActionEnum.AccountHistory,
      account: address,
      count: '10',
    },
  });
  return history.history.map((block) => {
    return {
      account: block.account,
      amount: rawToNano(block.amount, 5),
      type: block.type,
      localTimestamp: block.localTimestamp,
    };
  });
}

export function getPendingBlocksSimple(
  accounts: string[]
): Promise<{ [key: string]: { [key: string]: PendingBlock } }> {
  return nanoApi
    .accountsPending({
      accountsPendingRequest: {
        action: AccountsPendingRequestActionEnum.AccountsPending,
        accounts: accounts,
        count: '1',
        source: true,
      },
    })
    .then((res) => res.blocks);
}

export function loadFrontiers(
  addresses: string[]
): Promise<Map<string, Frontier> | { [key: string]: Frontier }> {
  return nanoApi
    .accountsFrontiers({
      accountsFrontiersRequest: {
        action: AccountsFrontiersRequestActionEnum.AccountsFrontiers,
        accounts: addresses,
      },
    })
    .then((res) => res.frontiers);
}

export function loadBlocks(
  frontiers: string[]
): Promise<{ [key: string]: BlockInfo }> {
  return nanoApi
    .blocksInfo({
      blocksInfoRequest: {
        action: BlocksInfoRequestActionEnum.BlocksInfo,
        hashes: frontiers,
        jsonBlock: ModelBoolean.True,
      },
    })
    .then((res) => res.blocks);
}
