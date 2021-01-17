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
    .kui-input-label {
        color: #212529;
        display: block;
        padding-bottom: 8px;
        padding-top: 8px;
    }
    .kui-h3 {
        font-size: 14px;
        font-weight: 400;
    }
    .kui-input-holder {
        padding: 0 10px 10px 10px;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    :global(.kui-input) {
        height: 36px;
        width: 100%;
        border-radius: 2px;
        padding-left: 10px;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #aaaaaa;
    }

    :global(.kui-input:focus) {
        border: 2px solid #676686;
        border-radius: 4px;
    }

    :global(.kui-input ::-moz-placeholder,
    .kui-input :-moz-placeholder) {
        color: #212529;
    }

    :global(.kui-input:focus) {
        outline: 0;
    }
</style>

<div class="kui-input-holder" class:row on:focus>
    {#if languageId || text}
        <label for={languageId || text} class="kui-input-label kui-h3" data-l10n-id={languageId}>{text}</label>
    {/if}
    <slot/>
</div>
