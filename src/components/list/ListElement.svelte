<script>
    export let primaryLanguageId;
    export let primaryText;
    export let secondaryLanguageId;
    export let secondaryText;
</script>
<li tabindex="1">
    <div class="kui-list-cont">
        {#if !!primaryLanguageId}
            <p class="kui-pri" data-l10n-id="{primaryLanguageId}"></p>
        {:else if !!primaryText}
            <p class="kui-pri">{primaryText}</p>
        {/if}
        {#if !!secondaryLanguageId}
            <p class="kui-sec" data-l10n-id="{secondaryLanguageId}"></p>
        {:else if !!secondaryText}
            <p class="kui-sec">{secondaryText}</p>
        {/if}
    </div>
</li>
