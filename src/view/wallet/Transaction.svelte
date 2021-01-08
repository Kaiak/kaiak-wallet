<script lang="ts">
    import type {NanoTransaction} from "../../machinery/models";
    import {rawToNano, truncateNanoAddress} from "../../machinery/nanocurrency-web-wrapper";
    import Seperator from "../../components/Seperator.svelte";
    import type {WalletState} from "../../machinery/WalletState";

    export let transaction: WalletState
</script>

