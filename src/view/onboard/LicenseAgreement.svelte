<script lang="ts">
    import {afterUpdate} from "svelte";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import Link from "../../components/Link.svelte";

    afterUpdate(() => navigationReload({
        middleKey: {
            languageId: 'onboard-disclaimer-agree',
            onClick: async () => { pushOnboardState({view: 'intro'}) }
        },
    }))
</script>

<Seperator languageId="license-title" />
<Text languageId="license-text"/>
<Text languageId="license-text2"/>
<Link href="https://www.gnu.org/licenses/gpl-2.0.html">GPLv2 License Agreement</Link>
<Text></Text>
