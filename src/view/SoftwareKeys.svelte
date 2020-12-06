<script lang="ts">
    import {pushMenu} from "../machinery/eventListener";
    import {softwareKeysStore} from "../stores/stores";

    const toggleMenu = () => pushMenu('menu')

    let middleKeyLanguageId: string | undefined = undefined
    let middleOnClick: (() => void) | undefined = undefined

    softwareKeysStore.subscribe(value => {
        if(value.middleKey) {
            middleKeyLanguageId = "softkey-capture-camera"
            middleOnClick = value.middleKey
        } else if(value.middleKey === undefined) {
            middleKeyLanguageId = undefined;
            middleOnClick = undefined
        }
    })

</script>

<div class="kui-software-key">
    <h5 role="button" class="kui-h5 kui-text-left" id="kui-left-soft-key"></h5>
    {#if middleKeyLanguageId}
        <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" on:click={middleOnClick} data-l10n-id={middleKeyLanguageId}></h5>
    {:else}
        <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase"></h5>
    {/if}
    <h5 role="button" class="kui-h5 kui-text-right" on:click={toggleMenu} data-l10n-id="rightNavButton"></h5>
</div>
