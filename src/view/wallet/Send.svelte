<script lang="ts">
    import QRcode from "../send/QRcode.svelte";
    import Input from "../send/Input.svelte";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";

    type SendAction = 'qr' | 'input'
    let selectedSend: SendAction | undefined = undefined;
</script>
<Seperator languageId="send-select" />
{#if selectedSend === 'qr'}
    <QRcode />
{:else if selectedSend === 'input'}
    <Input />
{:else}
    <List>
        <Primary primaryText="Send by QR code" on:click={() => selectedSend = "qr"}/>
        <Primary primaryText="Send by address" on:click={() => selectedSend = "input"}/>
    </List>
{/if}