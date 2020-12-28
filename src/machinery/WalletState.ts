import type { NanoAddress, NanoTransaction, NanoWallet } from './models';
import { walletStore } from '../stores/stores';

export interface WalletState {
  wallet: NanoWallet | undefined;
  selectedAccount?: NanoAddress;
  transactions?: NanoTransaction[];
}

export function setWalletState(walletState: WalletState) {
  walletStore.set(walletState);
}
