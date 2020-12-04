import { wallet } from 'nanocurrency-web';
import type { NanoWallet } from './models';
import { setWallet } from './secure-storage';

export interface WalletResult {
  seed: string;
  mnemonic: string;
}

export function generateWallet(): WalletResult {
  const w = wallet.generate();
  return {
    seed: w.seed,
    mnemonic: w.mnemonic,
  };
}

export function createWallet(
  walletData: WalletResult,
  encryptionSecret: string
): NanoWallet {
  const nanoWallet: NanoWallet = {
    seed: walletData.seed,
    encryptionSecret: encryptionSecret,
    accounts: [{ alias: 'main', address: undefined }],
  };
  return setWallet(nanoWallet);
}

export function addNanoAccount(walletData: NanoWallet): NanoWallet {
  const next = walletData.accounts.length;
  const nextAccount = wallet.accounts(walletData.seed, 0, next)[next];
  let updatedNanoWallet: NanoWallet = {
    seed: walletData.seed,
    encryptionSecret: walletData.encryptionSecret,
    accounts: [
      ...walletData.accounts,
      { address: nextAccount.address, alias: undefined },
    ],
  };
  return setWallet(updatedNanoWallet);
}
