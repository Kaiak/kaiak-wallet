<script lang="ts">
    import type {SoftKey} from "../machinery/SoftwareKeysState";
    import {softwareKeysStore} from "../machinery/SoftwareKeysState";
    import {onDestroy} from "svelte";

    let leftKey: SoftKey | undefined = undefined
    let middleKey: SoftKey | undefined = undefined
    let rightKey: SoftKey | undefined = undefined

    let keys: SoftKey[] = []

    const unsubscribe = softwareKeysStore.subscribe(value => {
        leftKey = value.leftKey
        middleKey = value.middleKey
        rightKey = value.rightKey
    })

    const getOnClicker = (key: SoftKey) => {
        if(!key || key.disabled === true) {
            return undefined;
        } else {
            return key?.onClick
        }
    }

    onDestroy(() => unsubscribe())

</script>

<style>
    h5 {
        margin: 0;
        padding: 0;
    }
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
    .kui-software-key-left {
        text-align: left;
        font-weight: 600;
    }
    .kui-software-key-center {
        text-align: center;
        text-transform: uppercase;
        font-weight: 800;
    }
    .kui-software-key-right {
        text-align: right;
        font-weight: 600;
    }
    .kui-software-key h5 {
        width: 33.3333333333%;
    }
    .hidden {
        visibility: hidden;
    }
    .disabled {
        opacity: 0.2;
    }
</style>

<div class="kui-software-key">
    <h5 class:hidden={!leftKey} class="kui-software-key-left" class:disabled={leftKey?.disabled === true} on:click={getOnClicker(leftKey)} data-l10n-id={leftKey?.languageId}>|</h5>
    <h5 class:hidden={!middleKey} class="kui-software-key-center" class:disabled={middleKey?.disabled === true} on:click={getOnClicker(middleKey)} data-l10n-id={middleKey?.languageId}>|</h5>
    <h5 class:hidden={!rightKey} class="kui-software-key-right" class:disabled={rightKey?.disabled === true} on:click={getOnClicker(rightKey)} data-l10n-id={rightKey?.languageId}>|</h5>
</div>
