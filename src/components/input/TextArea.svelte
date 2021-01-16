<script lang="ts">
    import LabelInput from "./LabelInput.svelte";
    export let languageId: string | undefined
    export let text: string | undefined
    export let placeholderLanguage: string | undefined
    export let value: string = '';
</script>

<style>
    textarea {
        height: 100%;
    }

    textarea:focus {
        margin-bottom: -2px;
    }
    .kui-text {
        font-size: 17px;
        font-weight: 400;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
    }
</style>
<LabelInput languageId={languageId} text={text}>
    <textarea id={languageId} class="kui-input kui-text navigation" data-l10n-id={placeholderLanguage} rows="3" lang="en" bind:value/>
</LabelInput>
