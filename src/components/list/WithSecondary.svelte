<script lang="ts">
    export let primaryLanguageId: string | undefined;
    export let primaryText: string | undefined;
    export let secondaryLanguageId : string | undefined;
    export let secondaryText: string | undefined;
</script>
<li tabindex="1" class="navigation" on:click>
    <div class="kui-list-cont">
        <p class="kui-pri" data-l10n-id="{primaryLanguageId}">{primaryText}</p>
        <p class="kui-sec" data-l10n-id="{secondaryLanguageId}">{secondaryText}</p>
    </div>
</li>
