<script lang="ts">
    import SendByAddress from "../send/SendByAddress.svelte";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import type { NanoAccount, RAW } from "../../machinery/models";
    import type {SendAction } from "../../machinery/NavigationState";


    let selectedSend: SendAction | undefined = undefined;

    export let account: NanoAccount;
    export let balance: RAW;
</script>
<Seperator languageId="send-select" />

{#if selectedSend}
    <SendByAddress account={account} balance={balance} sendType={selectedSend}/>
{:else}
    <List>
        <Primary primaryText="Send by QR code" on:click={() => selectedSend = "qr"}/>
        <Primary primaryText="Send by address" on:click={() => selectedSend = "address"}/>
    </List>
{/if}
