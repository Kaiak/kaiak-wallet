<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import {onMount} from "svelte";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import Title from "../../components/Title.svelte";

    onMount(() => navigationReload({
        leftKey: {
            languageId: 'create',
            onClick: async () => {
                pushOnboardState({view: 'disclaimer', walletResult: undefined, alias: undefined})
            }
        },
        rightKey: {
            onClick: async () => pushOnboardState({view: 'disclaimer-import'}),
            languageId: 'import-wallet'
        }
    }))
</script>

<Title languageId="title" />
<Seperator languageId="what-is-nano-title"/>
<Text languageId="onboard-title" />
<Seperator languageId="onboard-import-or-create"/>
<Text breakAll={false} languageId="onboard-description"/>

