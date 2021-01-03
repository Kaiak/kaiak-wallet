<script lang="ts">
    import LabelInput from "./LabelInput.svelte";
    export let languageId: string | undefined
    export let text: string | undefined
    export let placeholderLanguage: string | undefined
    export let value: string = '';
</script>
<LabelInput languageId={languageId} text={text}>
    <input type="text" class="kui-input kui-text navigation" data-l10n-id={placeholderLanguage} on:input value={value}>
</LabelInput>
