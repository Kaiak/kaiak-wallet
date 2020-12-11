<script lang="ts">
    import Content from "../components/Content.svelte";
    import Text from "../components/Text.svelte";
    import {onMount} from "svelte";
    import {navigationStore, softwareKeysStore} from "../stores/stores";
    import {pushState} from "../machinery/eventListener";
    import type {NavigationState, OnboardState, OnboardView} from "../machinery/NavigationState";
    import Disclaimer from "./onboard/Disclaimer.svelte";

    let onboardState: OnboardState | undefined = undefined
    let state: NavigationState | undefined = undefined
    let view: OnboardView | undefined = undefined

    navigationStore.subscribe((value) => {
        state = value;
        onboardState = state?.onboardState
        view = onboardState?.view;
    })

    onMount(() => {
        softwareKeysStore.set({
            middleKey: {
                languageId: 'onboard-start',
                onClick: () => {
                    pushState({...state, onboardState: {view: 'disclaimer'}})
                }
            },
            leftKey: undefined
        })
    })
</script>


<Content titleKey="create-wallet">
    {#if view === 'disclaimer'}
        <Disclaimer />
    {:else}
        <Text languageId="onboard-title" />
        <Text breakAll={true} languageId="onboard-description"></Text>
    {/if}
</Content>


