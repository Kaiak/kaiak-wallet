<script>
    export let body;
    export let languageId;
    export let breakAll;
</script>

{#if breakAll}
    <div class="kui-body kui-text kui-text-break" data-l10n-id="{languageId}" on:click>{body}</div>
{:else}
    <div class="kui-body kui-text" data-l10n-id="{languageId}" on:click>{body}</div>
{/if}

