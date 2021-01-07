<script lang="ts">
    import type {NanoTransaction} from "../machinery/models";
    import Account from "./wallet/Account.svelte";
    import Content from "../components/Content.svelte";
    import type {AccountAction} from "../machinery/NavigationState";
    import type {WalletState} from "../machinery/WalletState";

    export let walletState: WalletState
    export let accountAction: AccountAction | undefined
    export let fullscreen: boolean = false;

    let transactions: NanoTransaction[] | undefined = walletState?.transactions;
</script>

<Content titleKey="account" fullscreen={fullscreen}>
    <Account wallet={walletState.wallet} selectedAccount={walletState.account} action={accountAction} transactions={transactions}/>
</Content>

