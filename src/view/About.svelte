<script lang="ts">
    import Content from "../components/Content.svelte";
    import Text from "../components/Text.svelte";
    import Seperator from "../components/Seperator.svelte";
    import Link from "../components/Link.svelte";
    import type {WalletState} from "../machinery/WalletState";
    import {getLanguage} from "../machinery/language";
    import {navigationReload} from "../machinery/eventListener";
    import {onMount} from "svelte";

    export let version: () => string
    export let walletState: WalletState

    $: canDonate = walletState?.account !== undefined
    $: getVersion = `${getLanguage('version')} ${version()}`;

    onMount(() => navigationReload())
</script>

<Content titleKey="about">
    <Seperator languageId="about-project-title" />
    <Text languageId="about-project-text" />
    <Link href="https://github.com/Kaiak/kaiak-wallet">Kaiak Github</Link>
    <Seperator languageId="about-version-title" />
    <Text>{getVersion}</Text>
</Content>
