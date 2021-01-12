<script lang="ts">
    import Content from "../../components/Content.svelte";
    import {onDestroy} from "svelte";
    import {navigationStore} from "../../stores/stores";
    import type {NavigationState, OnboardState, OnboardView} from "../../machinery/NavigationState";
    import Disclaimer from "./Disclaimer.svelte";
    import CreateSeed from "./CreateSeed.svelte";
    import AccountAlias from "./AccountAlias.svelte";
    import SetPIN from "./SetPIN.svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import DisclaimerImport from "./DisclaimerImport.svelte";
    import InputSeed from "./InputSeed.svelte";
    import KeyboardLayout from "./KeyboardLayout.svelte";
    import Intro from "./Intro.svelte";
    import LicenseAgreement from "./LicenseAgreement.svelte";
    import CreateOrImport from "./CreateOrImport.svelte";

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

</script>


<Content titleKey="create-wallet">
    {#if view === 'intro' || view === undefined}
        <Intro />
    {:else if view === 'license'}
        <LicenseAgreement/>
    {:else if view === 'create-or-import'}
        <CreateOrImport />
    {:else if view === 'disclaimer'}
        <Disclaimer />
    {:else if view === 'seed'}
        <CreateSeed walletResult={walletResult} />
    {:else if view === 'account'}
        <AccountAlias walletResult={walletResult} />
    {:else if view === 'pin'}
        <SetPIN walletResult={walletResult} alias={accountAlias} />
    {:else if view === 'keyboard-change'}
        <DisclaimerImport />
    {:else if view === 'disclaimer-import'}
        <KeyboardLayout />
    {:else if view === 'input-import'}
        <InputSeed seedInputValue={attemptedSeedInput} />
    {/if}
</Content>


