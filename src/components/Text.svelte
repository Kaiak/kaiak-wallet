<script>
    export let body;
    export let languageId;
    export let breakAll;
</script>

{#if breakAll}
    <div class="kui-body kui-text kui-text-break" tabindex="1" data-l10n-id="{languageId}" on:click>{body}</div>
{:else}
    <div class="kui-body kui-text" tabindex="1" data-l10n-id="{languageId}" on:click>{body}</div>
{/if}

