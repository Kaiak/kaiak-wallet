<script>
    export let body;
    export let languageId;
    export let breakAll;
</script>

<style>
    div:focus {
        outline: none;
    }
</style>

{#if breakAll}
    <div class="kui-body kui-text kui-text-break navigation" tabindex="1" data-l10n-id="{languageId}" on:click on:focus><slot></slot></div>
{:else}
    <div class="kui-body kui-text navigation" tabindex="1" data-l10n-id="{languageId}" on:click on:focus><slot></slot></div>
{/if}

