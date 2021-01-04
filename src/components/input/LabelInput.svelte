<script lang="ts">
    export let languageId: string | undefined
    export let text: string | undefined
    export let row: boolean = false
</script>

<style>
    .row {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: space-between;
    }
</style>

<div class="kui-input-holder" class:row>
    {#if languageId || text}
        <label class="kui-input-label kui-h3" data-l10n-id={languageId}>{text}</label>
    {/if}
    <slot/>
</div>
