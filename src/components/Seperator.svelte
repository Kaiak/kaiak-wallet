<script>
    export let languageId;
    export let text;
</script>

<div class="kui-separator">
    {#if !!languageId}
        <p class="kui-thi" data-l10n-id={languageId}></p>
    {:else if !!text}
        <p class="kui-thi">{text}</p>
    {/if}
</div>
