export type NanoAddress = string
export type Seed = string

export interface NanoAccount {
    alias: string
    address: NanoAddress
}

export interface NanoWallet {
    accounts: NanoAccount[]
    seed: Seed
}

export interface NanoTransaction {
    account: NanoAddress
    amount: string
    type: string
    localTimestamp: string
}
