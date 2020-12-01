<script lang="ts">
    export let titleKey: string
    export let title: string | undefined
</script>

<div class="kui-header">
    <h1 class="kui-h1" id="kui-header" data-l10n-id={titleKey}>{title}</h1>
</div>
<div class="kui-content-area" id="content-area">
    <slot />
</div>
