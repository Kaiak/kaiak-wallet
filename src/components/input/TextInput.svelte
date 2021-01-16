<script lang="ts">
    import LabelInput from "./LabelInput.svelte";
    export let languageId: string | undefined
    export let text: string | undefined
    export let placeholderLanguage: string | undefined
    export let value: string | undefined = ''
</script>
<style>
    .kui-text {
        font-size: 17px;
        font-weight: 400;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
    }
</style>
<LabelInput languageId={languageId} text={text} >
    <input id={languageId} type="text" class="kui-input kui-text navigation" data-l10n-id={placeholderLanguage} lang="en" on:input value={value} autocomplete="off">
</LabelInput>
