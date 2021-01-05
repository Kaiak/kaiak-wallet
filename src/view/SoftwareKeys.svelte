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
    .disabled {
        opacity: 0.2;
    }
</style>

<div class="kui-software-key">
    <h5 role="button" class:hidden={!leftKey} class:disabled={leftKey?.disabled === true} on:click={getOnClicker(leftKey)} data-l10n-id={leftKey?.languageId}>|</h5>
    <h5 role="button" class:hidden={!middleKey} class:disabled={middleKey?.disabled === true} on:click={getOnClicker(middleKey)} data-l10n-id={middleKey?.languageId}>|</h5>
    <h5 role="button" class:hidden={!rightKey} class:disabled={rightKey?.disabled === true} on:click={getOnClicker(rightKey)} data-l10n-id={rightKey?.languageId}>|</h5>
</div>
