import { wallet } from 'nanocurrency-web';
import type { NanoWallet } from './models';
import { deleteStore, setWallet } from './secure-storage';
import type {
  Account,
  Wallet,
} from 'nanocurrency-web/dist/lib/address-importer';

export const BIP39_SEED_LENGTH = 128;
export const NANO_SEED_LENGTH = 64;

export interface WalletResult {
  seed: string;
  mnemonic: string;
}

export interface WalletData {
  seed: string;
  aliases: string[];
}

// Wraps BIP39 and legacy fromSeed
function fromSeed(seed: string): Wallet {
  return seed.length === BIP39_SEED_LENGTH
    ? wallet.fromSeed(seed)
    : wallet.fromLegacySeed(seed);
}

// Wraps BIP39 and legacy accounts
function accounts(
  seed: string
  // eslint-disable-next-line no-unused-vars
): (seed: string, from: number, to: number) => Account[] {
  return seed.length === BIP39_SEED_LENGTH
    ? wallet.accounts
    : wallet.legacyAccounts;
}

export function generateWallet(): Promise<WalletResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const w = wallet.generateLegacy(undefined);
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
        const w = fromSeed(seed);
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
  const nextAccount = accounts(walletData.seed)(walletData.seed, 0, next)[next];
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

export function walletDataToWallet(
  walletData: WalletData,
  encryptionSecret: string | undefined
): NanoWallet {
  const addresses = accounts(walletData.seed)(
    walletData.seed,
    0,
    walletData.aliases.length - 1
  );
  return {
    seed: walletData.seed,
    encryptionSecret: encryptionSecret,
    accounts: addresses.map((address, i) => {
      return {
        alias: walletData.aliases[i],
        address: address.address,
        privateKey: address.privateKey,
        publicKey: address.publicKey,
        balance: undefined,
      };
    }),
  };
}
