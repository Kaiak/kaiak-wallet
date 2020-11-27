import {AccountHistoryRequestActionEnum, Configuration, NodeRPCsApi} from "nano-rpc-fetch";
import type {AccountHistoryRequest, AccountHistoryResponse} from "nano-rpc-fetch";

type NanoAccount = string

export interface NanoTransaction {
    account: NanoAccount
    amount: number
    type: string
}

const nanoApi = new NodeRPCsApi(new Configuration({
    basePath: "https://nano.mehl.no/node"
}));

export async function resolveHistory(address: string): Promise<NanoTransaction[]> {
    let history: AccountHistoryResponse = await nanoApi.accountHistory({
        // @ts-ignore TODO: Fix the library exporting these wrong
        accountHistoryRequest: {
            action: AccountHistoryRequestActionEnum.AccountHistory,
            account: address,
            count: "10"
        }
    })
    return history.history.map(block => {
        return {
            account: block.account,
            amount: block.amount,
            type: block.type
        }
    })
}
