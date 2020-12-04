import { wallet } from 'nanocurrency-web';
import type { NanoWallet } from './models';
import {storage} from "./secure-storage";

interface WalletData {
  seed: string;
  aliases: string[];
}

export interface WalletResult {
  data: NanoWallet;
  mnemonic: string;
}

const WALLET_STORE = 'wallet_store';

const walletDataToWallet: (WalletData) => NanoWallet = (walletData: WalletData) => {
  const addresses = wallet.accounts(walletData.seed, 0, walletData.aliases.length - 1);
  return {
    seed: walletData.seed,
    accounts: addresses.map((address, i) => {
    return {
      alias: walletData.aliases[i],
      address: address.address,
    };
  }),
  }
}

const walletToWalletData: (NanoWallet) => WalletData = (wallet: NanoWallet) => {
  return {
    seed: wallet.seed,
    aliases: wallet.accounts.map(account => account.alias)
  }
}

export function unlockWallet(encryptionSecret: string): NanoWallet | undefined {
  try {
    const data: WalletData = storage(encryptionSecret).getItem(WALLET_STORE);
    if (data.seed && data.aliases) {
      return walletDataToWallet(data)
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export function generateWallet(): WalletResult {
  const w = wallet.generate();
  const data: WalletData = {
    seed: w.seed,
    aliases: ['test']
  }
  return {
    data: walletDataToWallet(data),
    mnemonic: w.mnemonic,
  };
}

export function storeWallet(
  walletData: NanoWallet,
  encryptionSecret: string
): void {
  storage(encryptionSecret).setItem(WALLET_STORE, walletToWalletData(walletData))
}

/** TODO: Store */
export function addNanoAccount(walletData: NanoWallet): NanoWallet {
  const next = walletData.accounts.length;
  const nextAccount = wallet.accounts(walletData.seed, 0, next)[next];
  return {
    seed: walletData.seed,
    accounts: [
      ...walletData.accounts,
      { address: nextAccount.address, alias: undefined },
    ],
  };
}

export function walletDataExists(): boolean {
  return localStorage.getItem(WALLET_STORE) !== undefined
}
