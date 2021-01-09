<script lang="ts">
    import {afterUpdate} from "svelte";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";

    afterUpdate(() => navigationReload({
        middleKey: {
            languageId: 'onboard-keyboard-done',
            onClick: async () => { pushOnboardState({view: 'input-import'}) }
        },
    }))
</script>

<Seperator languageId="onboard-keyboard-title" />
<Text languageId="onboard-keyboard-layout"/>
