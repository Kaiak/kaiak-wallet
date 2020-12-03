<script lang="ts">
    import Content from "../components/Content.svelte";
    import LabelledInput from "../components/LabelledInput.svelte";
    import Button from "../components/Button.svelte";

    const onInputPassword = (event) => {
        console.log(event.target.value)
    }
</script>

<Content titleKey="unlock-wallet">

    <LabelledInput languageId="unlock-label" placeholderLanguage="unlock-label" on:change={onInputPassword}/>
    <Button languageId="unlock-wallet"/>
</Content>
