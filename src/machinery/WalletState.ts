import type { NanoAccount, NanoTransaction, NanoWallet } from './models';
import { walletStore } from '../stores/stores';
import { loadAndResolveAccountData, updateAccountInWallet } from './nano-ops';
import { getHistory } from './nano-rpc-fetch-wrapper';
import { pushToast } from './eventListener';

export interface WalletState {
  wallet: NanoWallet | undefined;
  transactions?: NanoTransaction[];
  account?: NanoAccount;
}

export function setWalletState(walletState: WalletState) {
  walletStore.set(walletState);
}

export async function updateWalletState(
  nanoAccount: NanoAccount,
  wallet: NanoWallet
): Promise<void> {
  const {
    account: updatedAccount,
    resolvedCount,
  } = await loadAndResolveAccountData(nanoAccount, 0);
  const resolvedTransactions = await getHistory(nanoAccount.address);
  if (resolvedCount > 0) {
    pushToast({ languageId: 'got-new-transactions', type: 'success' });
  }
  walletStore.set({
    wallet: updateAccountInWallet(updatedAccount, wallet),
    account: updatedAccount,
    transactions: resolvedTransactions,
  });
}
