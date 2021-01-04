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
        background-color: #4A90E2;
        align-items: center;
        color: white;
        border-top: 2px #000034 solid;
        white-space: nowrap;
        font-weight: 700;
        box-sizing: border-box;
        padding: 10px 5px;
    }
    .kui-software-key h5 {
        width: 33.3333333333%;
        text-align: center;
        text-transform: uppercase;
    }
    .hidden {
        visibility: hidden;
    }
</style>

<div class="kui-software-key">
    <h5 role="button" class:hidden={!leftKey} on:click={leftKey?.onClick} data-l10n-id={leftKey?.languageId}>|</h5>
    <h5 role="button" class:hidden={!middleKey} on:click={middleKey?.onClick} data-l10n-id={middleKey?.languageId}>|</h5>
    <h5 role="button" class:hidden={!rightKey} on:click={rightKey?.onClick} data-l10n-id={rightKey?.languageId}>|</h5>
</div>
