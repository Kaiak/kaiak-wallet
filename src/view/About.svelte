<script lang="ts">
    import Content from "../components/Content.svelte";
    import {onMount} from "svelte";
    import {navigationReload} from "../machinery/eventListener";
    import Text from "../components/Text.svelte";
    import Seperator from "../components/Seperator.svelte";
    import Link from "../components/Link.svelte";


    onMount(() => navigationReload())
</script>

<Content titleKey="about">
    <Seperator languageId="about-project-title" />
    <Text languageId="about-project-text"></Text>
    <Link href="https://github.com/Kaiak/kaiak-wallet">Kaiak Github</Link>
</Content>
