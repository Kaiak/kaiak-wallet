import { wallet } from 'nanocurrency-web';
import type { NanoWallet } from './models';
import { deleteStore, setWallet } from './secure-storage';

export interface WalletResult {
  seed: string;
  mnemonic: string;
}

export function generateWallet(): Promise<WalletResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const w = wallet.generate();
      resolve({
        seed: w.seed,
        mnemonic: w.mnemonic,
      });
    }, 0);
  });
}

export function importWalletFromSeed(seed: string): Promise<WalletResult> {
  return new Promise((resolve, error) => {
    setTimeout(() => {
      try {
        const w = wallet.fromSeed(seed);
        resolve({
          seed: w.seed,
          mnemonic: w.mnemonic,
        });
      } catch (e) {
        error();
      }
    }, 0);
  });
}

export async function createWallet(
  walletData: WalletResult,
  encryptionSecret: string,
  alias: string
): Promise<NanoWallet | undefined> {
  const nanoWallet: NanoWallet = {
    seed: walletData.seed,
    encryptionSecret: encryptionSecret,
    accounts: [
      {
        alias: alias,
        address: undefined,
        privateKey: undefined,
        publicKey: undefined,
        balance: undefined,
      },
    ],
  };
  await deleteStore();
  return setWallet(nanoWallet);
}

export async function addNanoAccount(
  walletData: NanoWallet
): Promise<NanoWallet | undefined> {
  const next = walletData.accounts.length;
  const nextAccount = wallet.accounts(walletData.seed, 0, next)[next];
  let updatedNanoWallet: NanoWallet = {
    seed: walletData.seed,
    encryptionSecret: walletData.encryptionSecret,
    accounts: [
      ...walletData.accounts,
      {
        address: nextAccount.address,
        alias: undefined,
        privateKey: nextAccount.privateKey,
        publicKey: nextAccount.publicKey,
        balance: undefined, // TODO: Fetch balance?
      },
    ],
  };
  return setWallet(updatedNanoWallet);
}
