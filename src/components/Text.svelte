<script lang="ts">
    export let languageId;
    export let breakAll;
    export let bold: boolean = false;
</script>

<style>
    div:focus {
        outline: none;
    }
    .bold {
        font-weight: bold;
    }
</style>

{#if breakAll}
    <div class="kui-body kui-text kui-text-break navigation" class:bold tabindex="1" data-l10n-id="{languageId}" on:click on:focus><slot/></div>
{:else}
    <div class="kui-body kui-text navigation" class:bold tabindex="1" data-l10n-id="{languageId}" on:click on:focus><slot/></div>
{/if}

