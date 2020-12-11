<script lang="ts">
    import {pushMenu} from "../machinery/eventListener";
    import {softwareKeysStore} from "../stores/stores";
    import type {SoftKey} from "../machinery/SoftwareKeysState";

    const toggleMenu = () => pushMenu('menu')

    let leftKey: SoftKey | undefined = undefined
    let middleKey: SoftKey | undefined = undefined

    softwareKeysStore.subscribe(value => {
        leftKey = value.leftKey
        middleKey = value.middleKey
    })

</script>

<div class="kui-software-key">

    {#if leftKey}
        <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" on:click={leftKey.onClick} data-l10n-id={leftKey.languageId}></h5>
    {:else}
        <h5 role="button" class="kui-h5 kui-text-left" id="kui-left-soft-key"></h5>
    {/if}
    {#if middleKey}
        <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" on:click={middleKey.onClick} data-l10n-id={middleKey.languageId}></h5>
    {:else}
        <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase"></h5>
    {/if}
    <h5 role="button" class="kui-h5 kui-text-right" on:click={toggleMenu} data-l10n-id="rightNavButton"></h5>
</div>
