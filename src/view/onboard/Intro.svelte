<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import {onMount} from "svelte";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import Title from "../../components/Title.svelte";
    import Link from "../../components/Link.svelte";

    onMount(() => navigationReload({
        middleKey: {
            languageId: 'continue',
            onClick: async () => {
                pushOnboardState({view: 'license', walletResult: undefined, alias: undefined})
            }
        },
    }))
</script>

<Title languageId="title" />
<Seperator languageId="what-is-nano-title"/>
<Text languageId="onboard-title" />
<Seperator languageId="about-project-title"/>
<Text languageId="about-project-text" />
<Link href="https://github.com/Kaiak/kaiak-wallet">Kaiak Github</Link>

