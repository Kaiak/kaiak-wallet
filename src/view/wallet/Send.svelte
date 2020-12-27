<script lang="ts">
    import LabelledInput from "../../components/LabelledInput.svelte";
    import Button from "../../components/Button.svelte";
    import type {NanoAddress, NanoAccount, RAW, NanoWallet} from "../../machinery/models";
    import {tools} from "nanocurrency-web";
    import {sendNano} from "../../machinery/nano-ops";
    import {nanoToRaw, rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import CameraCapture from "../../components/CameraCapture.svelte";
    import {pushAccountAction, pushToast} from "../../machinery/eventListener";
    import type {AccountAction} from "../../machinery/NavigationState";
    import {walletStore} from "../../stores/stores";
    import {load} from "../../machinery/loader-store";

    export let wallet: NanoWallet;
    export let sendType: AccountAction;
    export let account: NanoAccount;
    export let balance: RAW;
    export let setType: (a: AccountAction) => void

    let sending: boolean = false;

    let toAddress: NanoAddress | undefined
    let showCamera: boolean = sendType === 'send_qr'

    let sendValue: number | undefined = undefined

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
            sendValue = amount;
        }
    }

    const setMax = () => {
        if(balance && balance.raw) {
            sendValue = Number.parseFloat(rawToNano(balance, 10).amount)
        }
    }

    const send = async () => {
        if (toAddress && sendValue > 0) {
            await load({
                languageId: 'sending-funds',
                load: async () => {
                    const updatedAccount: NanoAccount | undefined = await sendNano(account, toAddress, nanoToRaw({amount: sendValue.toString()}), balance)
                    if(updatedAccount) {
                        wallet.accounts = wallet.accounts.map(account => {
                            return account.address === updatedAccount.address ? updatedAccount : account
                        })
                        walletStore.set({
                            wallet: wallet,
                            selectedAccount: updatedAccount.address
                        })
                        pushAccountAction('overview')
                    } else {
                        pushToast({ languageId: 'unable-to-send' })
                    }
                },
            })
        }
    }

    const scannedAddress = (address: NanoAddress) => {
        toAddress = address;
        showCamera = false;
        setType('send_address');
    }

</script>

{#if sendType === 'send_qr' && showCamera}
    <CameraCapture scannedAddress={scannedAddress}/>
{:else}
    <LabelledInput languageId="send-address" type="text" on:input={setAddress} value={toAddress}/>
    <LabelledInput languageId="send-amount" type="text" on:input={setAmount} value={sendValue}/>
    <Button languageId="send-max-button" on:click={setMax}/>
    <Button languageId="send-button" on:click={send}/>
{/if}
