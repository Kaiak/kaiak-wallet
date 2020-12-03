import SecureLS from 'secure-ls';
import { wallet } from 'nanocurrency-web';
import type { NanoWallet } from './models';

interface AccountAlias {
  alias: string;
}

export interface WalletData {
  seed: string;
  aliases: AccountAlias[];
}

export interface WalletResult {
  data: WalletData;
  mnemonic: string;
}

const WALLET_STORE = 'wallet_store';

export function unlockWallet(encryptionSecret: string): NanoWallet | undefined {
  let ls = new SecureLS({
    encodingType: 'aes',
    encryptionSecret: encryptionSecret,
  });
  try {
    const data: WalletData = ls.get(WALLET_STORE);
    if (data.seed && data.aliases) {
      const addresses = wallet.accounts(data.seed, 0, data.aliases.length - 1);
      return {
        seed: data.seed,
        accounts: addresses.map((address, i) => {
          return {
            alias: data.aliases[i] ? data.aliases[i].alias : 'undefined',
            address: address.address,
          };
        }),
      };
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
  return {
    data: {
      seed: w.seed,
      aliases: [{ alias: 'test' }],
    },
    mnemonic: w.mnemonic,
  };
}

export function storeWallet(
  walletData: WalletData,
  encryptionSecret: string
): void {
  let ls = new SecureLS({
    encodingType: 'aes',
    encryptionSecret: encryptionSecret,
  });
  ls.set(WALLET_STORE, walletData);
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
