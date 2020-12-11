<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {onMount} from "svelte";
    import {softwareKeysStore} from "../../stores/stores";
    import {pushState2} from "../../machinery/eventListener";

    onMount(() => {
        softwareKeysStore.set({
            middleKey: {
                languageId: 'onboard-disclaimer-ok',
                onClick: () => {
                    pushState2({ onboardState: { view: 'seed' }})
                }
            },
            leftKey: undefined
        })
    })
</script>

<Text languageId="onboard-disclaimer-text"></Text>
