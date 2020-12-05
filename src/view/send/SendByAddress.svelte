<script lang="ts">
    import LabelledInput from "../../components/LabelledInput.svelte";
    import Button from "../../components/Button.svelte";
    import type {NanoAddress, NANO, NanoAccount} from "../../machinery/models";
    import {tools} from "nanocurrency-web";
    import {sendNano} from "../../machinery/nano-ops";

    export let account: NanoAccount;
    export let balance: NANO;

    let toAddress: NanoAddress | undefined
    let sendAmount: NANO | undefined
    let balanceValue: string | undefined = undefined

    const setAddress = (event) => {
        const address = event.target.value;
        if(tools.validateAddress(address)) {
            toAddress = address
        }
    }

    const setAmount = (event) => {
        let strAmount: string = event.target.value;
        const amount: number = Number.parseFloat(strAmount);
        if(!isNaN(amount)) {
            sendAmount = { amount: strAmount }
        }
    }

    const setMax = () => {
        sendAmount = balance
        balanceValue = sendAmount.amount
    }

    const send = async () => {
        if(toAddress && sendAmount) {
            await sendNano(account, toAddress, sendAmount, balance)
        }
    }

</script>

<LabelledInput languageId="send-address" type="text" on:change={setAddress}/>
<LabelledInput languageId="send-amount" type="text" on:change={setAmount} bind:value={balanceValue}/>
<Button languageId="send-max-button" on:click={setMax}/>
<Button languageId="send-button" on:click={send}/>
