<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Content from "../../components/Content.svelte";
    import {afterUpdate} from "svelte";
    import {navigationReload, pushSetupAction} from "../../machinery/eventListener";
    import type {SetupAction} from "../../machinery/NavigationState";
    import SeedExporter from "./SeedExporter.svelte";

    export let setupAction: SetupAction;

    afterUpdate(() => navigationReload());
</script>


<Content titleKey="setup">
    {#if setupAction === 'menu'}
        <Seperator languageId="setup-action"/>
        <List>
            <Primary primaryLanguageId="export-seed" on:click={() => pushSetupAction('export-seed')}/>
        </List>
    {:else if setupAction === 'export-seed'}
        <SeedExporter/>
    {/if}
</Content>


