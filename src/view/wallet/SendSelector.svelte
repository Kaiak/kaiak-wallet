<script lang="ts">
    import Primary from "../../components/list/Primary.svelte";
    import List from "../../components/List.svelte";
    import {navigationReload, pushAccountAction} from "../../machinery/eventListener";
    import {afterUpdate} from "svelte";

    afterUpdate(() => navigationReload());
</script>

<List>
    <Primary primaryText="Send by QR code" on:click={() => pushAccountAction('send_qr')}/>
    <Primary primaryText="Send by address" on:click={() => pushAccountAction('send_address')}/>
</List>
