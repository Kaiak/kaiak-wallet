<script lang="ts">
    import QRcode from "../send/QRcode.svelte";
    import SendByAddress from "../send/SendByAddress.svelte";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import type { NanoAccount, RAW } from "../../machinery/models";

    type SendAction = 'qr' | 'input'
    let selectedSend: SendAction | undefined = undefined;

    export let account: NanoAccount;
    export let balance: RAW;
</script>
<Seperator languageId="send-select" />
{#if selectedSend === 'qr'}
    <QRcode />
{:else if selectedSend === 'input'}
    <SendByAddress account={account} balance={balance}/>
{:else}
    <List>
        <Primary primaryText="Send by QR code" on:click={() => selectedSend = "qr"}/>
        <Primary primaryText="Send by address" on:click={() => selectedSend = "input"}/>
    </List>
{/if}
