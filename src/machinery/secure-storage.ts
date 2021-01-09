import type { NanoWallet } from './models';
import { Store, _idb } from 'secure-webstore/dist/secure-webstore';
import { WalletData, walletDataToWallet } from './wallet';

const APP_STORE = 'kaios_nano';
const WALLET_KEY = 'wallet';

function walletToWalletData(wallet: NanoWallet): WalletData {
  return {
    seed: wallet.seed,
    aliases: wallet.accounts.map((account) => account.alias),
  };
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

export async function deleteStore() {
  const store = new _idb.Store(APP_STORE, APP_STORE);
  await _idb.clear(store);
}

export async function walletExists() {
  const store = new _idb.Store(APP_STORE, APP_STORE);
  const keys = await _idb.keys(store);
  return keys.length > 0;
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
