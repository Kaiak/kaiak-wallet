<script lang="ts">
    export let titleKey: string
    export let title: string | undefined
    export let fullscreen: boolean = false
</script>

<style>
    .kui-header {
        background-color: #529aee;
        color: #fff;
        text-align: center;
    }
    .kui-h1 {
        font-size: 17px;
        font-weight: 300;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 0;
    }
    .kui-content-area {
        flex: 1 1 auto;
        align-self: stretch;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
{#if !fullscreen}
    <div class="kui-header">
        <h1 class="kui-h1" data-l10n-id={titleKey}>{title}</h1>
    </div>
{/if}
<div class="kui-content-area">
    <slot />
</div>
