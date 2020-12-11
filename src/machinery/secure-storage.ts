import type { NanoWallet } from './models';
import { wallet } from 'nanocurrency-web';
import { Store } from 'secure-webstore/dist/secure-webstore';

const APP_STORE = 'kaios_nano';
const WALLET_KEY = 'wallet';

interface WalletData {
  seed: string;
  aliases: string[];
}

function walletDataToWallet(
  walletData: WalletData,
  encryptionSecret: string | undefined
): NanoWallet {
  const addresses = wallet.accounts(
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

function walletToWalletData(wallet: NanoWallet): WalletData {
  return {
    seed: wallet.seed,
    aliases: wallet.accounts.map((account) => account.alias),
  };
}

export async function destroyWallet(): Promise<void> {
  const store: Store = new Store(APP_STORE, APP_STORE);
  await store.destroy();
}

export async function setWallet(
  wallet: NanoWallet
): Promise<NanoWallet | undefined> {
  try {
    const store: Store = new Store(APP_STORE, wallet.encryptionSecret);
    await store.init();
    await store.set(WALLET_KEY, walletToWalletData(wallet));
    return wallet;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function unlockWallet(
  encryptionSecret: string
): Promise<NanoWallet | undefined> {
  try {
    const store = new Store(APP_STORE, encryptionSecret);
    await store.init();
    const data: WalletData = await store.get(WALLET_KEY);
    if (data.seed && data.aliases) {
      return walletDataToWallet(data, encryptionSecret);
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
