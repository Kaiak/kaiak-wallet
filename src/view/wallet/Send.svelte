<script lang="ts">
    import type {NanoAddress, NanoAccount, RAW, NanoWallet} from "../../machinery/models";
    import {tools} from "nanocurrency-web";
    import {sendNano, updateAccountInWallet} from "../../machinery/nano-ops";
    import {nanoToRaw, rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import {navigationReload, pushAccountAction, pushToast} from "../../machinery/eventListener";
    import {load} from "../../machinery/loader-store";
    import {onMount} from "svelte";
    import {setWalletState, updateWalletState} from "../../machinery/WalletState";
    import NumberInput from "../../components/input/NumberInput.svelte";
    import TextArea from "../../components/input/TextArea.svelte";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";
    import {getLanguage} from "../../machinery/language";
    import Text from "../../components/Text.svelte";

    export let wallet: NanoWallet;
    export let account: NanoAccount;
    export let balance: RAW;
    export let toAddress: NanoAddress | undefined = undefined

    let sending: boolean = false;
    let sendValue: number | undefined = undefined


    const softwareKeys = (disabled) => {
        return {
            leftKey: {
                languageId: 'update-button',
                onClick: async() => {
                    await load({
                        languageId: 'loading-refresh',
                        load: async () => {
                            await updateWalletState(account, wallet)
                        }
                    })
                }
            },
            middleKey: {
                disabled: disabled,
                languageId: 'send-button',
                onClick: send
            },
            rightKey: {
                languageId: 'set-max-button',
                onClick: setMax
            },
        }
    }

    $: nanoAmount = balance ? Number.parseFloat(rawToNano(balance).amount) : 0
    $: {
        const canSend = (toAddress ? tools.validateAddress(toAddress) : false) && sendValue <= nanoAmount && sendValue > 0
        setSoftwareKeys(softwareKeys(!canSend))
    }
    $: balanceString = `${getLanguage('current-balance')}: ${nanoAmount} Nano`

    const setMax = async () => {
        if (balance && balance.raw) {
            sendValue = Number.parseFloat(rawToNano(balance).amount)
        }
    }

    const send = async () => {
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

    onMount(() => navigationReload(softwareKeys(true)))

</script>
<Text>{balanceString}</Text>
<TextArea languageId="send-address" bind:value={toAddress}/>
<NumberInput languageId="send-amount" bind:value={sendValue}/>
