import type {
  NanoAccount,
  NanoAddress,
  NanoTransaction,
  NanoWallet,
} from './models';
import { walletStore } from '../stores/stores';

export interface WalletState {
  wallet: NanoWallet | undefined;
  transactions?: NanoTransaction[];
  account?: NanoAccount;
}

export function setWalletState(walletState: WalletState) {
  walletStore.set(walletState);
}
