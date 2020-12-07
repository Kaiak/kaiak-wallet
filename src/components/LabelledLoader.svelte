<script lang="ts">
    import Spinner from 'svelte-spinner';
    export let languageId: string | undefined
</script>

<style>
    .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
</style>
<div class="spinner">
    <span data-l10n-id={languageId}/>
    <Spinner
        size="50"
        speed="750"
        color="#4A90E2"
        thickness="3"
        gap="40"
    />
</div>


