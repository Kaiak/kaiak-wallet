<script lang="ts">
    export let languageId: string | undefined
    export let text: string | undefined
</script>

<div class="kui-input-holder">
    {#if languageId || text}
        <label class="kui-input-label kui-h3" data-l10n-id={languageId}>{text}</label>
    {/if}
    <slot/>
</div>
