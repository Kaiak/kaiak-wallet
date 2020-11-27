<script>
    export let primaryLanguageId;
    export let primaryText;
    export let secondaryLanguageId;
    export let secondaryText;
</script>
<li tabindex="1">
    <div class="kui-list-cont">
        <p class="kui-pri" data-l10n-id="{primaryLanguageId}">{primaryText}</p>
        {#if !!secondaryLanguageId || !!secondaryText}
        <p class="kui-sec" data-l10n-id="{secondaryLanguageId}">{secondaryText}</p>
        {/if}
    </div>
</li>
