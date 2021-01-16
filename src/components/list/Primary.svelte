<script lang="ts">
    import ListItem from "./ListItem.svelte";
    export let primaryLanguageId: string;
    export let primaryText: string;
</script>
<style>
    .kui-pri {
        font-size: 17px;
        font-weight: 400;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
    }
    p {
        margin: 0;
        padding: 0;
    }
</style>
<ListItem on:click>
    <p class="kui-pri" data-l10n-id="{primaryLanguageId}">
        {primaryText}
    </p>
</ListItem>
