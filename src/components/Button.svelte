<script>
    export let text;
    export let languageId;

    const onClick = () => {

    }
</script>

{#if !!languageId}
    <button class="navigation kui-btn" data-l10n-id="{languageId}" on:click={onClick}></button>
{:else if !!text}
    <button class="navigation kui-btn"  on:click={onClick}>{text}</button>
{/if}

