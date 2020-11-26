<script>
    import List from "../components/List.svelte";
    import QRcode from "./send/QRcode.svelte";
    import Input from "./send/Input.svelte";
    import Seperator from "../components/Seperator.svelte";

    let selectedSend = undefined;

    const elements = [
        {
            primaryText: "Send by QR code",
            type: "primary",
            data: {key: "send_qr"},
            onClick: () => selectedSend = "qr",
        },
        {
            primaryText: "Send by address",
            type: "primary",
            data: {key: "send_address"},
            onClick: () => selectedSend = "input",
        }
    ];

</script>
<Seperator text="Select the way you send" />
{#if selectedSend === 'qr'}
    <QRcode />
{:else if selectedSend === 'input'}
    <Input />
{:else}
    <List elements={elements} />
{/if}
