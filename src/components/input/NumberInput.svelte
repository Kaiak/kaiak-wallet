<script lang="ts">
    import LabelInput from "./LabelInput.svelte";
    export let languageId: string | undefined
    export let text: string | undefined
    export let placeholderLanguage: string | undefined
    export let value: any;
</script>
<LabelInput languageId={languageId} text={text}>
    <!-- To get number behaviour working https://stackoverflow.com/questions/60890475/backspace-doesnt-work-in-number-input-field-kaios-svelte3 -->
    <input id="{languageId}" type="tel" class="kui-input kui-text navigation" data-l10n-id={placeholderLanguage} bind:value={value} autocomplete="off"/>
</LabelInput>
