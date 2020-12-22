<script lang="ts">
    import {pushMenu} from "../machinery/eventListener";
    import type {SoftKey} from "../machinery/SoftwareKeysState";
    import {softwareKeysStore} from "../machinery/SoftwareKeysState";

    let leftKey: SoftKey | undefined = undefined
    let middleKey: SoftKey | undefined = undefined
    let rightKey: SoftKey | undefined = undefined

    let keys: SoftKey[] = []

    softwareKeysStore.subscribe(value => {
        leftKey = value.leftKey
        middleKey = value.middleKey
        rightKey = value.rightKey
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
    {#if rightKey}
        <h5 role="button" class="kui-h5 kui-text-right" on:click={rightKey.onClick} data-l10n-id={rightKey.languageId}></h5>
    {:else}
        <h5 role="button" class="kui-h5 kui-text-right"></h5>
    {/if}

</div>
