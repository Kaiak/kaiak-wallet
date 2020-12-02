import type { NanoAccount, NanoTransaction } from './models';

export type MenuSelector = 'wallet' | 'setup' | 'menu' | 'about';
export type AccountAction = 'send' | 'transactions' | 'receive';

export interface SelectedAccountState {
  selectedAccount: NanoAccount;
  view: AccountAction | undefined;
  selectedTransaction: NanoTransaction | undefined;
}

export interface NavigationState {
  menu: MenuSelector;
  account: SelectedAccountState | undefined;
}
