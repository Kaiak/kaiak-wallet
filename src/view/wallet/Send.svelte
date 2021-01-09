<script lang="ts">
    import type {NanoAddress, NanoAccount, RAW, NanoWallet} from "../../machinery/models";
    import {tools} from "nanocurrency-web";
    import {sendNano, updateAccountInWallet} from "../../machinery/nano-ops";
    import {nanoToRaw, rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import {navigationReload, pushAccountAction, pushToast} from "../../machinery/eventListener";
    import {load} from "../../machinery/loader-store";
    import {onMount} from "svelte";
    import {setWalletState} from "../../machinery/WalletState";
    import NumberInput from "../../components/input/NumberInput.svelte";
    import TextArea from "../../components/input/TextArea.svelte";

    export let wallet: NanoWallet;
    export let account: NanoAccount;
    export let balance: RAW;
    export let toAddress: NanoAddress | undefined = undefined

    let sending: boolean = false;

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

    onMount(() => {
        navigationReload({
            leftKey: {
                languageId: 'set-max-button',
                onClick: setMax
            },
            rightKey: {
                languageId: 'send-button',
                onClick: send
            }
        })
    })

</script>
<TextArea languageId="send-address" on:input={setAddress} value={toAddress}/>
<NumberInput languageId="send-amount" bind:value={sendValue}/>
