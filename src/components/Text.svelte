<script lang="ts">
    export let languageId;
    export let breakAll;
</script>

<style>
    span {
        box-decoration-break: clone;
    }
    span:focus {
        outline: none;
    }
    .text-break {
        word-break: break-all;
    }
</style>

<span class="kui-text navigation" class:text-break={breakAll} tabindex="1" data-l10n-id="{languageId}" on:click on:focus><slot/></span>
