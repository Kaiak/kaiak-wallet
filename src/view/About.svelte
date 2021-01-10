<script lang="ts">
    import Content from "../components/Content.svelte";
    import {onMount} from "svelte";
    import {navigationReload, pushAccountAction} from "../machinery/eventListener";
    import Text from "../components/Text.svelte";
    import Seperator from "../components/Seperator.svelte";
    import Link from "../components/Link.svelte";
    import type {SoftwareKeysState} from "../machinery/SoftwareKeysState";
    import {setWalletState} from "../machinery/WalletState";
    import type {WalletState} from "../machinery/WalletState";
    import {DEFAULT_REP} from "../machinery/nano-ops";
    import {getLanguage} from "../machinery/language";

    export let version: () => string
    export let walletState: WalletState

    $: canDonate = walletState?.account !== undefined
    $: getVersion = `${getLanguage('version')} ${version()}`;

    const softwareKeys: SoftwareKeysState = {
        rightKey: {
            languageId: 'about-donate-button',
            onClick: async () => {
                setWalletState({
                    ...walletState,
                    sendToAddress: DEFAULT_REP
                })
                pushAccountAction('send_address')
            }
        }
    }

    onMount(() => navigationReload(canDonate ? softwareKeys : undefined))
</script>

<Content titleKey="about">
    <Seperator languageId="about-project-title" />
    <Text languageId="about-project-text" />
    <Link href="https://github.com/Kaiak/kaiak-wallet">Kaiak Github</Link>
    <Seperator languageId="about-project-donate" />
    <Text languageId="about-project-donate-text" />
    <Text>{getVersion}</Text>
</Content>
