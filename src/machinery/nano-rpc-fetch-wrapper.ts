import type { Frontier, NanoAddress, NanoTransaction, RAW } from './models';
import {
  AccountBalanceRequestActionEnum,
  AccountBalanceResponse,
  AccountHistoryRequestActionEnum,
  AccountHistoryResponse,
  AccountRepresentativeRequestActionEnum,
  AccountsFrontiersRequestActionEnum,
  AccountsFrontiersResponse,
  AccountsPendingRequestActionEnum,
  AccountsPendingResponse,
  BlockInfo,
  BlocksInfoRequestActionEnum,
  BlocksInfoResponse,
  Configuration,
  ModelBoolean,
  NodeRPCsApi,
  PendingBlock,
  ProcessRequestActionEnum,
  ProcessResponse,
  SubType,
  WorkGenerateRequestActionEnum,
  WorkGenerateResponse,
} from 'nano-rpc-fetch';

const nanoApi = new NodeRPCsApi(
  new Configuration({
    basePath: 'https://nano.mehl.no/node',
  })
);

export async function resolveBalance(address: NanoAddress): Promise<RAW> {
  let balance: AccountBalanceResponse = await nanoApi.accountBalance({
    accountBalanceRequest: {
      action: AccountBalanceRequestActionEnum.AccountBalance,
      account: address,
    },
  });
  return { raw: balance.balance.toString() };
}

export async function getRepresentative(
  address: NanoAddress
): Promise<NanoAddress> {
  const response = await nanoApi.accountRepresentative({
    accountRepresentativeRequest: {
      action: AccountRepresentativeRequestActionEnum.AccountRepresentative,
      account: address,
    },
  });
  return response.representative;
}

export async function processSimple(
  block: any,
  subtype: SubType
): Promise<ProcessResponse> {
  return await nanoApi.process({
    processRequest: {
      action: ProcessRequestActionEnum.Process,
      block: block,
      jsonBlock: ModelBoolean.True,
      subtype: subtype,
    },
  });
}

export async function generateWork(
  frontier: string,
  work: string
): Promise<string> {
  const response: WorkGenerateResponse = await nanoApi.workGenerate({
    workGenerateRequest: {
      action: WorkGenerateRequestActionEnum.WorkGenerate,
      hash: frontier,
      difficulty: work,
    },
  });
  return response.work;
}

export async function resolveHistory(
  address: NanoAddress
): Promise<NanoTransaction[]> {
  try {
    const history: AccountHistoryResponse = await nanoApi.accountHistory({
      accountHistoryRequest: {
        action: AccountHistoryRequestActionEnum.AccountHistory,
        account: address,
        count: '10',
      },
    });
    return history.history.map((block) => {
      return {
        account: block.account,
        amount: { raw: block.amount.toString() },
        type: block.type,
        localTimestamp: block.localTimestamp,
      };
    });
  } catch (e) {
    return [];
  }
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
