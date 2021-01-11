<script lang="ts">
    export let languageId;
    export let breakAll;
    export let preventNavigation: boolean = false;
</script>

<style>
    span {
        display: inline-block;
        padding: 5px;
    }
    span:focus {
        outline: none;
    }
    .text-break {
        word-break: break-all;
    }
</style>

<span class="kui-text" class:navigation={!preventNavigation} class:text-break={breakAll} tabindex="1" data-l10n-id="{languageId}" on:click on:focus><slot/></span>
