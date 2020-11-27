<script lang="ts">
    import ListItem from "./ListItem.svelte";
    export let primaryLanguageId: string;
    export let primaryText: string;
</script>
<ListItem primaryLanguageId={primaryLanguageId} on:click>
    {primaryText}
</ListItem>
