<script lang="ts">
    export let text: string;
    export let languageId: string;
</script>

<button class="navigation kui-btn" data-l10n-id="{languageId}" on:click>{text}</button>

