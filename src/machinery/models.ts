export type NanoAddress = string;
export type Seed = string;
export type PrivateKey = string;
export type PublicKey = string;
export type Frontier = string;
export type BlockHash = string;

export interface NanoAccount {
  alias: string;
  address: NanoAddress;
  publicKey: PrivateKey;
  privateKey: PrivateKey;
  balance: RAW | undefined;
  representative?: NanoAddress;
}

export interface NanoWallet {
  accounts: NanoAccount[];
  seed: Seed;
  encryptionSecret: string | undefined;
}

export interface NanoTransaction {
  account: NanoAddress;
  amount: RAW;
  type: string;
  localTimestamp: string;
}

export interface NANO {
  amount: string;
}

export interface RAW {
  raw: string;
}

export interface AccountInfo {
  representative: NanoAddress;
  balance: RAW;
  frontier: Frontier;
}

export interface PendingTransaction {
  hash: BlockHash;
  amount: RAW;
}

export interface ResolvedAccount {
  account: NanoAccount;
  resolvedCount: number;
}
