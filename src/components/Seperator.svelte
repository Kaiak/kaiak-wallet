<script lang="ts">
    export let languageId: string;
    export let primaryText: string;
</script>

<style>
    .kui-separator {
        color: #6a6a6a;
        background-color: #e6e6e6;
        line-height: 28px;
        padding-left: 10px;
    }
    .kui-thi {
        font-size: 12px;
        font-weight: 400;
    }
</style>

<div class="kui-separator">
    <p class="kui-thi" data-l10n-id={languageId}>{primaryText}</p>
</div>
