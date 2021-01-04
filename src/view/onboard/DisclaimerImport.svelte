<script lang="ts">
    import {afterUpdate} from "svelte";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";

    afterUpdate(() => navigationReload({
        middleKey: {
            languageId: 'onboard-disclaimer-ok',
            onClick: async () => { pushOnboardState({view: 'input-import'}) }
        },
    }))
</script>

<Seperator languageId="import-seed-title" />
<Text languageId="import-disclaimer-text"/>
<Text languageId="import-disclaimer-text-2"/>
