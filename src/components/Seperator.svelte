<script lang="ts">
    export let languageId: string;
    export let primaryText: string;
</script>

<style>
    .kui-separator {
        color: white;
        background-color: #000034;
        line-height: 28px;
        padding-left: 10px;
    }
    .kui-thi {
        font-size: 12px;
        font-weight: bold;
    }
</style>

<div class="kui-separator">
    <p class="kui-thi" data-l10n-id={languageId}>{primaryText}</p>
</div>
