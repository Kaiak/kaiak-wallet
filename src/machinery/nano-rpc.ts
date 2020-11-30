import type { AccountHistoryResponse } from 'nano-rpc-fetch';
import {
  AccountBalanceRequestActionEnum,
  AccountBalanceResponse,
  AccountHistoryRequestActionEnum,
  Configuration,
  NodeRPCsApi,
} from 'nano-rpc-fetch';
import { tools } from 'nanocurrency-web';
import type { Balance, NanoAddress, NanoTransaction } from './models';

const nanoApi = new NodeRPCsApi(
  new Configuration({
    basePath: 'https://nano.mehl.no/node',
  })
);

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

export async function resolveBalance(address: NanoAddress): Promise<Balance> {
  let balance: AccountBalanceResponse = await nanoApi.accountBalance({
    accountBalanceRequest: {
      action: AccountBalanceRequestActionEnum.AccountBalance,
      account: address,
    },
  });

  return {
    amount: rawToNano(balance.balance, 2),
  };
}

function rawToNano(raw: number, fractions?: number): string {
  return Number.parseFloat(
    tools.convert(raw.toString(), 'RAW', 'NANO')
  ).toFixed(fractions);
}
