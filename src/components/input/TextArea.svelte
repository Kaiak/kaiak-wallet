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
</style>
<LabelInput languageId={languageId} text={text}>
    <textarea class="kui-input kui-text navigation" data-l10n-id={placeholderLanguage} on:input value={value} rows="4"></textarea>
</LabelInput>
