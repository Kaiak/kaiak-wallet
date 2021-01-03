<script lang="ts">
    import Content from "../../components/Content.svelte";
    import {onDestroy} from "svelte";
    import {navigationStore} from "../../stores/stores";
    import type {ImportView} from "../../machinery/NavigationState";
    import Disclaimer from "./Disclaimer.svelte";
    import InputSeed from "./InputSeed.svelte";

    let view: ImportView | undefined = undefined

    const naviStore = navigationStore.subscribe((value) => {
        view = value?.importState?.view
    })

    onDestroy(() => naviStore())
</script>

<Content titleKey="import-wallet-heading">
    {#if view === 'disclaimer'}
        <Disclaimer />
    {:else if view === 'input'}
        <InputSeed />
    {/if}
</Content>
