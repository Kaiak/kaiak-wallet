<script lang="ts">
    import Title from "../components/Title.svelte";
    import {navigationReload} from "../machinery/eventListener";
    import {onMount} from "svelte";

    onMount(() => navigationReload())
</script>
<style>
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
</style>
<div class="image">
    <Title languageId="title"/>
    <img src="/assets/icons/kaiak_112.png"/>
</div>
