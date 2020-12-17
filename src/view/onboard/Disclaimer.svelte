<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {onMount} from "svelte";
    import {softwareKeysStore} from "../../stores/stores";
    import {popState, pushOnboardState} from "../../machinery/eventListener";
    import Seperator from "../../components/Seperator.svelte";

    onMount(() => {
        softwareKeysStore.set({
            middleKey: {
                languageId: 'onboard-disclaimer-ok',
                onClick: () => {
                    pushOnboardState({ view: 'seed', walletResult: undefined, alias: undefined})
                }
            },
            leftKey: {
                languageId: 'onboard-button-back',
                onClick: () => popState()
            },
            rightKey: undefined
        })
    })
</script>

<Seperator languageId="onboard-seed-title" />
<Text languageId="onboard-disclaimer-text"/>
