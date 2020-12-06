import CryptoJS from 'crypto-js';
import SecureStorage from 'secure-web-storage';
import type { NanoWallet } from './models';
import { wallet } from 'nanocurrency-web';

const WALLET_STORE = 'wallet_store';

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

export function setWallet(wallet: NanoWallet): NanoWallet {
  storage(wallet.encryptionSecret).setItem(
    WALLET_STORE,
    walletToWalletData(wallet)
  );
  return wallet;
}

export function unlockWallet(encryptionSecret: string): NanoWallet | undefined {
  try {
    const data: WalletData = storage(encryptionSecret).getItem(WALLET_STORE);
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

function storage(SECRET_KEY: string): SecureStorage {
  return new SecureStorage(localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, SECRET_KEY);

      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    },
  });
}

export function walletDataExists(): boolean {
  return localStorage.getItem(WALLET_STORE) !== null;
}
