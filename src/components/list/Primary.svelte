<script lang="ts">
    import ListItem from "./ListItem.svelte";
    export let primaryLanguageId: string;
    export let primaryText: string;
</script>
<ListItem on:click>
    <p class="kui-pri" data-l10n-id="{primaryLanguageId}">
        {primaryText}
    </p>
</ListItem>
