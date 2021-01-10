<script lang="ts">
    export let languageId;
    export let breakAll;
    export let bold: boolean = false;
</script>

<style>
    span {
        box-decoration-break: clone;
    }
    span:focus {
        outline: none;
    }
    .bold {
        font-weight: bold;
    }
    .text-break {
        word-break: break-all;
    }
</style>

<span class="kui-text navigation" class:text-break={breakAll} class:bold tabindex="1" data-l10n-id="{languageId}" on:click on:focus><slot/></span>
