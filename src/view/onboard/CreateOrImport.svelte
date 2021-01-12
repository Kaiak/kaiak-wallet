<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import {onMount} from "svelte";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import {walletExists} from "../../machinery/secure-storage";
    import Title from "../../components/Title.svelte";

    let existingWallet: boolean = false;

    onMount(async () => {
        existingWallet = await walletExists();

        navigationReload({
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
        })
    })
</script>

<Seperator languageId="onboard-import-or-create"/>
<Text breakAll={false} languageId="onboard-description"/>
{#if existingWallet}
    <Seperator languageId="onboard-important-title"/>
    <Title languageId="onboard-existing-wallet" warning={existingWallet} />
{/if}

