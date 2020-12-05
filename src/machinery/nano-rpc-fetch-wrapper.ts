import type { Frontier, NANO, NanoAddress, NanoTransaction } from './models';
import {
  AccountBalanceRequestActionEnum,
  AccountBalanceResponse,
  AccountHistoryRequestActionEnum,
  AccountHistoryResponse,
  AccountsFrontiersRequestActionEnum,
  AccountsFrontiersResponse,
  AccountsPendingRequestActionEnum,
  AccountsPendingResponse,
  BlocksInfoRequestActionEnum,
  BlocksInfoResponse,
  Configuration,
  ModelBoolean,
  NodeRPCsApi,
  ProcessRequestActionEnum,
  ProcessResponse,
  WorkGenerateRequestActionEnum,
  WorkGenerateResponse,
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

export async function processSimple(block: any): Promise<ProcessResponse> {
  return await nanoApi.process({
    processRequest: {
      action: ProcessRequestActionEnum.Process,
      block: block,
      jsonBlock: ModelBoolean.True,
    },
  });
}

export async function generateWork(frontier: string): Promise<string> {
  const response: WorkGenerateResponse = await nanoApi.workGenerate({
    workGenerateRequest: {
      action: WorkGenerateRequestActionEnum.WorkGenerate,
      hash: frontier,
    },
  });
  return response.work;
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

export async function getPendingBlocksSimple(
  accounts: string[]
): Promise<{ [key: string]: { [key: string]: PendingBlock } }> {
  const response: AccountsPendingResponse = await nanoApi.accountsPending({
    accountsPendingRequest: {
      action: AccountsPendingRequestActionEnum.AccountsPending,
      accounts: accounts,
      count: '1',
      source: true,
    },
  });
  return response.blocks;
}

export async function loadFrontiers(
  addresses: string[]
): Promise<Map<string, Frontier> | { [key: string]: Frontier }> {
  const response: AccountsFrontiersResponse = await nanoApi.accountsFrontiers({
    accountsFrontiersRequest: {
      action: AccountsFrontiersRequestActionEnum.AccountsFrontiers,
      accounts: addresses,
    },
  });
  return response.frontiers;
}

export async function loadBlocks(
  frontiers: string[]
): Promise<{ [key: string]: BlockInfo }> {
  const response: BlocksInfoResponse = await nanoApi.blocksInfo({
    blocksInfoRequest: {
      action: BlocksInfoRequestActionEnum.BlocksInfo,
      hashes: frontiers,
      jsonBlock: ModelBoolean.True,
    },
  });
  return response.blocks;
}
