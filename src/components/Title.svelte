<script lang="ts">
    export let languageId: string
    export let warning: boolean = false;
</script>

<style>
    h2 {
        font-size: 17px;
        font-weight: 600;
        padding: 5px;
    }
    .warning {
        color: red;
    }
</style>

<h2 data-l10n-id="{languageId}" class:warning></h2>
