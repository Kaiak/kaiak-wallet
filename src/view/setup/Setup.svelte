<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Content from "../../components/Content.svelte";
    import {afterUpdate} from "svelte";
    import {navigationReload} from "../../machinery/eventListener";
    import type {SetupAction} from "../../machinery/NavigationState";

    export let setupAction: SetupAction;

    afterUpdate(() => navigationReload());
</script>


<Content titleKey="setup">
    {#if setupAction === 'menu'}
        <Seperator languageId="setup-action"/>
        <List>
            <Primary primaryLanguageId="export-seed" on:click={() => console.log('English')}/>
        </List>
    {:else if setupAction === 'export-seed'}
        <div>foo</div>
    {/if}
</Content>


