<script lang="ts">
    import type {NanoAccount, NanoTransaction} from "../machinery/models";
    import Account from "./wallet/Account.svelte";
    import Content from "../components/Content.svelte";
    import type {AccountAction} from "../machinery/NavigationState";
    import type {WalletState} from "../machinery/WalletState";

    const getSelectedAccount = (state: WalletState): NanoAccount | undefined => {
        return state.wallet && state.selectedAccount ? state.wallet.accounts.filter(a => a.address === state.selectedAccount)[0] : undefined
    }

    export let walletState: WalletState
    export let accountAction: AccountAction | undefined
    export let fullscreen: boolean = false;
    $: selectedAccount = getSelectedAccount(walletState)

    let transactions: NanoTransaction[] | undefined = walletState?.transactions;
</script>

<Content titleKey="account" fullscreen={fullscreen}>
    <Account wallet={walletState.wallet} selectedAccount={selectedAccount} action={accountAction} transactions={transactions}/>
</Content>

