<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import type {GPS, NanoAccount} from "../../machinery/models";
    import {onMount} from "svelte";
    import {pushToast} from "../../machinery/eventListener";

    export let selectedAccount: NanoAccount;

    let gpsCoordinate: GPS | undefined = undefined;
    $: {
        console.log(gpsCoordinate)
    }


    onMount(async () => {

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const success = (pos) => {
            const {latitude, longitude, accuracy} = pos.coords;
            gpsCoordinate = { latitude, longitude, accuracy }
        }
        const error = (err) => pushToast({languageId: 'unable-to-get-gps', type: 'warn'})

        navigator.geolocation.getCurrentPosition(success, error, options);

        const mobileIdOptions = {
            forceSelection: false
        }
        const test = await navigator.getMobileIdAssertion(mobileIdOptions)
        console.log(test)
    })
</script>

<Seperator />
<Text>{selectedAccount.address}</Text>
