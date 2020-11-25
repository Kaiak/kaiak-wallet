<script>
    import Seperator from "../components/Seperator.svelte";
    import List from "../components/List.svelte";
    import Button from "../components/Button.svelte";
    import {onMount} from "svelte";

    let walletElements = [
        {
            primaryText: "main",
            type: "primary",
            data: {key: "main"}
        },
        {
            primaryText: "savings",
            type: "primary",
            data: {key: "savings"}
        }
    ];

    onMount(() => {
        console.log('mounts')
    })
</script>

<div id="receive__view">
    <Seperator text="Select your wallet" />
    <List elements={walletElements} />
    <Button  text="Generate address"/>
</div>

