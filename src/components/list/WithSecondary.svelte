<script lang="ts">
    import ListItem from "./ListItem.svelte";
    export let primaryLanguageId: string | undefined;
    export let primaryText: string | undefined;
    export let secondaryLanguageId : string | undefined;
    export let secondaryText: string | undefined;
</script>
<ListItem on:click>
    <p class="kui-pri" data-l10n-id="{primaryLanguageId}">{primaryText}</p>
    <p class="kui-sec" data-l10n-id="{secondaryLanguageId}">{secondaryText}</p>
</ListItem>
