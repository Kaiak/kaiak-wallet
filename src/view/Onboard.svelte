<script lang="ts">
    import Content from "../components/Content.svelte";
    import Text from "../components/Text.svelte";
    import {afterUpdate, beforeUpdate, onMount} from "svelte";
    import {navigationStore, softwareKeysStore} from "../stores/stores";
    import {navigationReload, pushOnboardState} from "../machinery/eventListener";
    import type {NavigationState, OnboardState, OnboardView} from "../machinery/NavigationState";
    import Disclaimer from "./onboard/Disclaimer.svelte";
    import CreateSeed from "./onboard/CreateSeed.svelte";
    import AccountAlias from "./onboard/AccountAlias.svelte";
    import SetPIN from "./onboard/SetPIN.svelte";
    import type {WalletResult} from "../machinery/wallet";
    import {setSoftwareKeys} from "../machinery/SoftwareKeysState";

    let onboardState: OnboardState | undefined = undefined
    let state: NavigationState | undefined = undefined
    let view: OnboardView | undefined = undefined
    let walletResult: WalletResult | undefined = undefined;
    let accountAlias: string | undefined = undefined;

    navigationStore.subscribe((value) => {
        state = value;
        onboardState = state?.onboardState
        view = onboardState?.view;
        walletResult = onboardState?.walletResult
        accountAlias = onboardState?.alias
    })
    onMount(() => {
        setSoftwareKeys({
            middleKey: {
                languageId: 'onboard-start',
                onClick: () => {
                    pushOnboardState({view: 'disclaimer', walletResult: undefined, alias: undefined })
                }
            },
            leftKey: undefined,
            rightKey: undefined,
        })
    })
    afterUpdate(navigationReload)
</script>


<Content titleKey="create-wallet">
    {#if view === 'disclaimer'}
        <Disclaimer />
    {:else if view === 'seed'}
        <CreateSeed />
    {:else if view === 'account'}
        <AccountAlias walletResult={walletResult} />
    {:else if view === 'pin'}
        <SetPIN walletResult={walletResult} alias={accountAlias} />
    {:else}
        <Text languageId="onboard-title" />
        <Text breakAll={true} languageId="onboard-description"/>
    {/if}
</Content>


