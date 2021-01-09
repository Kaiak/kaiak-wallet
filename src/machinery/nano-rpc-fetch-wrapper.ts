import type {
  AccountInfo,
  NanoAddress,
  NanoTransaction,
  PendingTransaction,
} from './models';
import {
  AccountHistoryRequestActionEnum,
  AccountHistoryResponse,
  AccountInfoRequestActionEnum,
  AccountInfoResponse,
  Configuration,
  ModelBoolean,
  NodeRPCsApi,
  PendingRequestActionEnum,
  PendingResponse,
  ProcessRequestActionEnum,
  ProcessResponse,
  SubType,
  WorkGenerateRequestActionEnum,
  WorkGenerateResponse,
} from 'nano-rpc-fetch';

const nanoApi = new NodeRPCsApi(
  new Configuration({
    basePath: 'https://kaiak.cc/node',
  })
);

export async function process(
  block: any,
  subtype: SubType
): Promise<ProcessResponse> {
  const response = await nanoApi.process({
    processRequest: {
      action: ProcessRequestActionEnum.Process,
      block: block,
      jsonBlock: ModelBoolean.True,
      subtype: subtype,
    },
  });

  if (response.hash) {
    return response;
  } else {
    throw Error('unable to process');
  }
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

export async function getHistory(
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

export async function getPending(
  address: NanoAddress
): Promise<PendingTransaction | undefined> {
  const response: PendingResponse = await nanoApi.pending({
    pendingRequest: {
      action: PendingRequestActionEnum.Pending,
      account: address,
      includeOnlyConfirmed: ModelBoolean.True,
      sorting: ModelBoolean.True,
      source: ModelBoolean.True,
    },
  });
  const blocks: [hash: string, block: any][] = Object.entries(response.blocks);
  if (blocks.length > 0) {
    const [blockHash, { amount }] = blocks[0];
    return {
      hash: blockHash,
      amount: {
        raw: amount,
      },
    };
  } else {
    return undefined;
  }
}

export async function accountInfo(
  account: NanoAddress
): Promise<AccountInfo | undefined> {
  const response: AccountInfoResponse = await nanoApi.accountInfo({
    accountInfoRequest: {
      action: AccountInfoRequestActionEnum.AccountInfo,
      account: account,
      representative: ModelBoolean.True,
    },
  });
  if (
    response.representative === undefined ||
    response.balance === undefined ||
    response.frontier === undefined
  ) {
    return undefined;
  } else {
    return {
      representative: response.representative,
      balance: {
        raw: response.balance.toString(),
      },
      frontier: response.frontier,
    };
  }
}
