<script lang="ts">
    import {afterUpdate} from "svelte";
    import {navigationReload, pushImportState} from "../../machinery/eventListener";
    import {BACK_BUTTON} from "../../machinery/SoftwareKeysState";
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";

    afterUpdate(() => navigationReload({
        middleKey: {
            languageId: 'onboard-disclaimer-ok',
            onClick: async () => { pushImportState({view: 'input'}) }
        },
        leftKey: BACK_BUTTON,
    }))
</script>

<Seperator languageId="import-seed-title" />
<Text languageId="import-disclaimer-text"/>
<Text languageId="import-disclaimer-text-2"/>
