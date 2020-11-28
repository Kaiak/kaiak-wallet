<script lang="ts">
    import type {NanoAccount} from "../../machinery/models";

    export let account: NanoAccount;
</script>

<div id="receive__view">

    <span>{account.alias}</span>
    <span>{account.address}</span>
</div>

