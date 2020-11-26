import {AccountHistoryRequestActionEnum, Configuration, NodeRPCsApi} from "nano-rpc-fetch";
import type {AccountHistoryRequest, AccountHistoryResponse} from "nano-rpc-fetch";

const nanoApi = new NodeRPCsApi(new Configuration({
    basePath: "https://nano.mehl.no/node"
}));

export function resolveHistory(address: string): Promise<AccountHistoryResponse> {
    return nanoApi.accountHistory({
        // @ts-ignore
        accountHistoryRequest: {
            action: AccountHistoryRequestActionEnum.AccountHistory,
            account: address,
            count: "10"
        }
    })
}
