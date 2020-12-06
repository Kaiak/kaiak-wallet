<script lang="ts">
    import LabelledInput from "../../components/LabelledInput.svelte";
    import Button from "../../components/Button.svelte";
    import type {NanoAddress, NANO, NanoAccount, RAW} from "../../machinery/models";
    import type {SendAction} from "../../machinery/NavigationState";
    import {tools} from "nanocurrency-web";
    import {sendNano} from "../../machinery/nano-ops";
    import {nanoToRaw, rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import CameraCapture from "../../components/CameraCapture.svelte";
    import {onMount} from "svelte";

    export let sendType: SendAction;
    export let account: NanoAccount;
    export let balance: RAW;

    let toAddress: NanoAddress | undefined
    let sendAmount: NANO | undefined
    let balanceValue: string | undefined = undefined
    let showCamera: boolean = sendType === 'qr'

    const setAddress = (event) => {
        const address = event.target.value;
        if (tools.validateAddress(address)) {
            toAddress = address
        }
    }

    const setAmount = (event) => {
        let strAmount: string = event.target.value;
        const amount: number = Number.parseFloat(strAmount);
        if (!isNaN(amount)) {
            sendAmount = {amount: strAmount}
        }
    }

    const setMax = () => {
        sendAmount = rawToNano(balance, 5)
        balanceValue = sendAmount.amount
    }

    const send = async () => {
        if (toAddress && sendAmount) {
            await sendNano(account, toAddress, nanoToRaw(sendAmount), balance)
        }
    }

    const scannedAddress = (address: NanoAddress) => {
        toAddress = address;
        showCamera = false;
        sendType = 'address'
    }

</script>

{#if sendType === 'qr' && showCamera}
    <CameraCapture scannedAddress={scannedAddress}/>
{:else}
    <LabelledInput languageId="send-address" type="text" on:change={setAddress} value={toAddress}/>
    <LabelledInput languageId="send-amount" type="text" on:change={setAmount} bind:value={balanceValue}/>
    <Button languageId="send-max-button" on:click={setMax}/>
    <Button languageId="send-button" on:click={send}/>
{/if}
