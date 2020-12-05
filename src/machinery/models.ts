export type NanoAddress = string;
export type Seed = string;
export type PrivateKey = string
export type PublicKey = string
export type Frontier = string

export interface NanoAccount {
  alias: string;
  address: NanoAddress;
  publicKey: PrivateKey;
  privateKey: PrivateKey;
}

export interface NanoWallet {
  accounts: NanoAccount[];
  seed: Seed;
  encryptionSecret: string | undefined;
}

export interface NanoTransaction {
  account: NanoAddress;
  amount: NANO;
  type: string;
  localTimestamp: string;
}

export interface NANO {
  amount: string;
}


