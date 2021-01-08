<script lang="ts">
    import type {NanoAddress, NanoAccount, RAW, NanoWallet} from "../../machinery/models";
    import {tools} from "nanocurrency-web";
    import {sendNano, updateAccountInWallet} from "../../machinery/nano-ops";
    import {nanoToRaw, rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import CameraCapture from "../../components/CameraCapture.svelte";
    import {navigationReload, pushAccountAction, pushToast} from "../../machinery/eventListener";
    import type {AccountAction} from "../../machinery/NavigationState";
    import {walletStore} from "../../stores/stores";
    import {load} from "../../machinery/loader-store";
    import {afterUpdate} from "svelte";
    import TextInput from "../../components/input/TextInput.svelte";
    import {setWalletState} from "../../machinery/WalletState";

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

    const setMax = async () => {
        if (balance && balance.raw) {
            sendValue = Number.parseFloat(rawToNano(balance, 10).amount)
        }
    }

    const send = async () => {
        if (toAddress && sendValue > 0) {
            await load({
                languageId: 'sending-funds',
                load: async () => {
                    const updatedAccount: NanoAccount | undefined = await sendNano(account, toAddress, nanoToRaw({amount: sendValue.toString()}))
                    if (updatedAccount) {
                        setWalletState({
                            wallet: updateAccountInWallet(updatedAccount, wallet),
                            account: updatedAccount,
                        })
                        pushToast({languageId: 'sent-funds-success', type: 'success'})
                        pushAccountAction('menu')
                    } else {
                        pushToast({languageId: 'unable-to-send', type: 'warn'})
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

    afterUpdate(() => {
        if (sendType === 'send_address') {
            navigationReload({
                leftKey: {
                    languageId: 'set-max-button',
                    onClick: setMax
                },
                middleKey: {
                    languageId: 'send-button',
                    onClick: send
                }
            })
        } else {
            navigationReload()
        }
    })

</script>

{#if sendType === 'send_qr' && showCamera}
    <CameraCapture scannedAddress={scannedAddress}/>
{:else}
    <TextInput languageId="send-address" type="text" on:input={setAddress} value={toAddress}/>
    <TextInput languageId="send-amount" type="text" on:input={setAmount} value={sendValue}/>
{/if}
