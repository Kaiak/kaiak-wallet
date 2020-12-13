import type { NanoAccount, NanoTransaction, NanoWallet } from './models';
import type { WalletResult } from './wallet';

export type MenuSelector =
  | 'wallet'
  | 'setup'
  | 'menu'
  | 'about'
  | 'unlock'
  | 'onboard';
export type AccountAction =
  | 'send'
  | 'transactions'
  | 'receive'
  | 'send_qr'
  | 'send_address';

export interface SelectedAccountState {
  selectedAccount: NanoAccount;
  view: AccountAction | undefined;
  selectedTransaction: NanoTransaction | undefined;
}

export type OnboardView = 'start' | 'disclaimer' | 'seed' | 'account' | 'pin';

export interface OnboardState {
  view: OnboardView;
  walletResult: WalletResult;
  alias: string;
}

export interface NavigationState {
  menu: MenuSelector;
  account: SelectedAccountState | undefined;
  wallet: NanoWallet | undefined;
  onboardState: OnboardState | undefined;
}

export const START_STATE: NavigationState = {
  menu: 'unlock',
  account: undefined,
  wallet: undefined,
  onboardState: undefined,
};
