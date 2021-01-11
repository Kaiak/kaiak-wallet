<script lang="ts">
    export let languageId;
    export let breakAll;
</script>

<style>
    span {
        display: inline-block;
        width: 100%;
    }
    span:focus {
        outline: none;
        background-color: #676686;
        color: #F4FAFF;
    }
    .text-break {
        word-break: break-all;
    }
</style>

<span class="kui-text navigation" class:text-break={breakAll} tabindex="1" data-l10n-id="{languageId}" on:click on:focus><slot/></span>
