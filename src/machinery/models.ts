export type NanoAddress = string
export type Seed = string

export interface Account {
    alias: string
    address: NanoAddress
}

export interface Wallet {
    accounts: Account[]
    seed: Seed
}

export interface NanoTransaction {
    account: NanoAddress
    amount: string
    type: string
    localTimestamp: string
}
