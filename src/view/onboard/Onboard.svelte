<script lang="ts">
    import Content from "../../components/Content.svelte";
    import Text from "../../components/Text.svelte";
    import {beforeUpdate, onDestroy} from "svelte";
    import {navigationStore} from "../../stores/stores";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import type {NavigationState, OnboardState, OnboardView} from "../../machinery/NavigationState";
    import Disclaimer from "./Disclaimer.svelte";
    import CreateSeed from "./CreateSeed.svelte";
    import AccountAlias from "./AccountAlias.svelte";
    import SetPIN from "./SetPIN.svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import DisclaimerImport from "./DisclaimerImport.svelte";
    import InputSeed from "./InputSeed.svelte";

    let onboardState: OnboardState | undefined = undefined
    let state: NavigationState | undefined = undefined
    let view: OnboardView | undefined = undefined
    let walletResult: WalletResult | undefined = undefined;
    let accountAlias: string | undefined = undefined;
    let attemptedSeedInput: string | undefined = undefined

    const naviStore = navigationStore.subscribe((value) => {
        state = value;
        onboardState = state?.onboardState
        view = onboardState?.view;
        walletResult = onboardState?.walletResult
        accountAlias = onboardState?.alias
        attemptedSeedInput = onboardState?.attemptedSeedImport
    })
    onDestroy(() => naviStore())
    beforeUpdate(() => navigationReload({
        leftKey: {
            languageId: 'create',
            onClick: async () => {
                pushOnboardState({view: 'disclaimer', walletResult: undefined, alias: undefined})
            }
        },
        rightKey: {
            onClick: async () => pushOnboardState({ view: 'disclaimer-import' }),
            languageId: 'import-wallet'
        }
    }))
</script>


<Content titleKey="create-wallet">
    {#if view === 'disclaimer'}
        <Disclaimer />
    {:else if view === 'seed'}
        <CreateSeed walletResult={walletResult} />
    {:else if view === 'account'}
        <AccountAlias walletResult={walletResult} />
    {:else if view === 'pin'}
        <SetPIN walletResult={walletResult} alias={accountAlias} />
    {:else if view === 'disclaimer-import'}
        <DisclaimerImport />
    {:else if view === 'input-import'}
        <InputSeed seedInputValue={attemptedSeedInput} />
    {:else}
        <Text languageId="onboard-title" />
        <Text breakAll={false} languageId="onboard-description"/>
    {/if}
</Content>


