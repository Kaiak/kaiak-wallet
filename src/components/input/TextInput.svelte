<script lang="ts">
    import LabelInput from "./LabelInput.svelte";
    export let languageId: string | undefined
    export let text: string | undefined
    export let placeholderLanguage: string | undefined
    export let value: string | undefined = ''
</script>
<LabelInput languageId={languageId} text={text} >
    <input id={languageId} type="text" class="kui-input kui-text navigation" data-l10n-id={placeholderLanguage} lang="en" on:input value={value}>
</LabelInput>
