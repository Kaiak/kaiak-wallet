<script lang="ts">
    export let primaryLanguageId: string;
    export let primaryText: string;
</script>
<li tabindex="1" class="navigation" on:click>
    <div class="kui-list-cont">
        <p class="kui-pri" data-l10n-id="{primaryLanguageId}">{primaryText}</p>
    </div>
</li>
