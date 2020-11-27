<script>
    export let text;
    export let languageId;

    const onClick = () => {

    }
</script>

<button class="navigation kui-btn" data-l10n-id="{languageId}" on:click={onClick}>{text}</button>

