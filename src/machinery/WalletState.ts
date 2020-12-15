import type { NanoAddress, NanoWallet } from './models';
import { walletStore } from '../stores/stores';

export interface WalletState {
  wallet: NanoWallet | undefined;
  selectedAccount: NanoAddress | undefined;
}

export function setWalletState(walletState: WalletState) {
  walletStore.set(walletState);
}
