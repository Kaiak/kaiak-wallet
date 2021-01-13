<script lang="ts">
    import type {NanoAccount} from "../../machinery/models";
    import type { WalletState } from "../../machinery/WalletState";
    import {tools} from "nanocurrency-web";
    import {sendNano, updateAccountInWallet} from "../../machinery/nano-ops";
    import {nanoToRaw, rawToNumber} from "../../machinery/nanocurrency-web-wrapper";
    import {navigationReload, pushAccountAction, pushToast} from "../../machinery/eventListener";
    import {load} from "../../machinery/loader-store";
    import {onMount} from "svelte";
    import {setWalletState, updateWalletState} from "../../machinery/WalletState";
    import NumberInput from "../../components/input/NumberInput.svelte";
    import TextArea from "../../components/input/TextArea.svelte";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";
    import {getLanguage} from "../../machinery/language";
    import Text from "../../components/Text.svelte";
    import {rawToReadable} from "../../machinery/text-utils";

    export let walletState: WalletState;
    $: wallet = walletState.wallet;
    $: account = walletState.account;
    $: balance = account.balance;
    $: toAddress = walletState.sendToAddress

    let sending: boolean = false;
    let sendValue: string | undefined = undefined

    const softwareKeys = (disabledSend, disabledMax) => {
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
                disabled: disabledSend,
                languageId: 'send-button',
                onClick: send
            },
            rightKey: {
                disabled: disabledMax,
                languageId: 'set-max-button',
                onClick: setMax
            },
        }
    }

    $: readableBalance = balance ? rawToReadable(balance) : ''
    $: numberBalance = balance ? Number.parseFloat(rawToNumber(balance)) : 0
    $: disabledMax = numberBalance <= 0;
    $: {
        const sendAsNumber = Number.parseFloat(sendValue)
        const canSend = (toAddress ? tools.validateAddress(toAddress) : false) && sendAsNumber <= numberBalance && sendAsNumber > 0
        setSoftwareKeys(softwareKeys(!canSend, disabledMax))
    }
    $: balanceString = `${getLanguage('current-balance')}: ${readableBalance} Nano`

    const setMax = async () => {
        if (balance && balance.raw && numberBalance > 0) {
            sendValue = rawToNumber(balance)
        }
    }

    const send = async () => {
        await load({
            languageId: 'sending-funds',
            load: async () => {
                let amount = nanoToRaw({amount: sendValue});
                const updatedAccount: NanoAccount | undefined = await sendNano(account, toAddress, amount)
                if (updatedAccount) {
                    setWalletState({
                        wallet: updateAccountInWallet(updatedAccount, wallet),
                        account: updatedAccount,
                        transactions: walletState.transactions,
                        transaction: walletState.transaction,
                    })
                    pushToast({languageId: 'sent-funds-success', type: 'success'})
                    pushAccountAction('menu')
                } else {
                    pushToast({languageId: 'unable-to-send', type: 'warn'})
                }
            },
        })
    }

    onMount(() => navigationReload(softwareKeys(true, disabledMax)))

</script>
<Text>{balanceString}</Text>
<TextArea languageId="send-address" bind:value={toAddress}/>
<NumberInput languageId="send-amount" bind:value={sendValue}/>
