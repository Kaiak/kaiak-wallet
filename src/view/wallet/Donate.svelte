<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import {setWalletState} from "../../machinery/WalletState";
    import type {WalletState} from "../../machinery/WalletState";
    import {DEFAULT_REP} from "../../machinery/nano-ops";
    import {navigationReload, pushAccountAction} from "../../machinery/eventListener";
    import {onMount} from "svelte";

    export let walletState: WalletState

    onMount(() => navigationReload({
        middleKey: {
            languageId: 'about-donate-button',
            onClick: async () => {
                setWalletState({
                    ...walletState,
                    sendToAddress: DEFAULT_REP
                })
                pushAccountAction('send_address')
            }
        }
    }))
</script>

<Seperator languageId="about-project-donate" />
<Text languageId="about-project-donate-text" />
