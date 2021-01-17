<script lang="ts">
    import ListItem from "./ListItem.svelte";
    export let primaryLanguageId: string | undefined;
    export let primaryText: string | undefined;
    export let secondaryLanguageId : string | undefined;
    export let secondaryText: string | undefined;
</script>
<style>
    .kui-pri {
        font-size: 17px;
        font-weight: 400;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
    }
    .kui-sec {
        font-size: 14px;
        font-weight: 400;
    }
    p {
        margin: 0;
        padding: 0;
    }
</style>
<ListItem on:click>
    <p class="kui-pri" data-l10n-id="{primaryLanguageId}">{primaryText}</p>
    <p class="kui-sec" data-l10n-id="{secondaryLanguageId}">{secondaryText}</p>
</ListItem>
