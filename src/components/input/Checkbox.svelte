<script lang="ts">
    import LabelInput from "./LabelInput.svelte";
    export let languageId: string | undefined
    export let checked;
</script>
<style>
    input {
        transform: scale(1.5);
    }
</style>

<LabelInput languageId={languageId} row={true} >
    <input type="checkbox" class="navigation" on:change/>
</LabelInput>
