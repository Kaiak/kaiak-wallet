import { wallet } from 'nanocurrency-web';
import type { NanoWallet } from './models';
import { destroyWallet, setWallet } from './secure-storage';

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

export async function createWallet(
  walletData: WalletResult,
  encryptionSecret: string
): Promise<NanoWallet | undefined> {
  const nanoWallet: NanoWallet = {
    seed: walletData.seed,
    encryptionSecret: encryptionSecret,
    accounts: [
      {
        alias: 'main',
        address: undefined,
        privateKey: undefined,
        publicKey: undefined,
        balance: undefined,
      },
    ],
  };
  return destroyWallet().then(() => setWallet(nanoWallet));
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
