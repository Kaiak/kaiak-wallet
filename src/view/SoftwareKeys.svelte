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

<style>
    .kui-software-key {
        display: flex;
        background-color: #cccccc;
        align-items: center;
        color: #212529;
        border-top: 2px #cbcbcb solid;
        white-space: nowrap;
        font-weight: 700;
        box-sizing: border-box;
        padding: 10px 5px;
    }
    .kui-software-key h5 {
        width: 33.3333333333%;
    }
    .kui-h5 {
        font-size: 14px;
        font-weight: 600;
    }
    .kui-text-left {
        text-align: left;
    }

    .kui-text-center {
        text-align: center;
    }

    .kui-text-right {
        text-align: right;
    }
    .kui-text-upcase {
        text-transform: uppercase;
    }
</style>

<div class="kui-software-key">

    {#if leftKey}
        <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" on:click={leftKey.onClick} data-l10n-id={leftKey.languageId}></h5>
    {:else}
        <h5 role="button" class="kui-h5 kui-text-left kui-text-upcase" id="kui-left-soft-key"></h5>
    {/if}
    {#if middleKey}
        <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" on:click={middleKey.onClick} data-l10n-id={middleKey.languageId}></h5>
    {:else}
        <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase"></h5>
    {/if}
    {#if rightKey}
        <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" on:click={rightKey.onClick} data-l10n-id={rightKey.languageId}></h5>
    {:else}
        <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase"></h5>
    {/if}
</div>
