<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {afterUpdate} from "svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import Seperator from "../../components/Seperator.svelte";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";
    import Checkbox from "../../components/input/Checkbox.svelte";

    export let walletResult: WalletResult;
    let checked: boolean = false;

    const createKeyWithEnabledState = (disabled: boolean) => {
        return {
            middleKey: {
                disabled: disabled,
                languageId: 'continue',
                    onClick: async () => {
                    pushOnboardState({view: 'account', walletResult: walletResult, alias: undefined})
                }
            }
        }
    }

    const createAcceptKey = (disabled) => {
        return {
            middleKey: {
                disabled: disabled,
                languageId: 'accept',
                onClick: async () => {
                    checked = !checked
                    setSoftwareKeys(createKeyWithEnabledState(!checked))
                }
            }
        }
    }

    const showAccept = (event) => {
        if(!checked) {
            setSoftwareKeys(createAcceptKey(false))
        }
    }

    const accept = (event) => {
        checked = event.target.checked;
        setSoftwareKeys(createKeyWithEnabledState(!checked))
    }

    afterUpdate(() => {
        if(!checked) navigationReload(createAcceptKey(true))
    })
</script>

<Seperator languageId="wallet-seed" />
<Text breakAll={true}>{walletResult.seed}</Text>
<Seperator languageId="wallet-accept"/>
<Checkbox languageId="wallet-accept-text" on:change={accept} on:focus={showAccept} bind:checked/>
