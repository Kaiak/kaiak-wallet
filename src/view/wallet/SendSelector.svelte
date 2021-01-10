<script lang="ts">
    import Primary from "../../components/list/Primary.svelte";
    import List from "../../components/List.svelte";
    import {navigationReload, pushAccountAction} from "../../machinery/eventListener";
    import {afterUpdate} from "svelte";
    import {SOFT_KEY_SELECT} from "../../machinery/SoftwareKeysState";

    afterUpdate(() => navigationReload({
        middleKey: SOFT_KEY_SELECT
    }));
</script>

<List>
    <Primary primaryText="Send by QR code" on:click={() => pushAccountAction('send_qr')}/>
    <Primary primaryText="Send by address" on:click={() => pushAccountAction('send_address')}/>
</List>
