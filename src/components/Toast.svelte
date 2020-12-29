<script lang="ts">
    import {toastStore} from "../stores/stores";
    import { slide } from 'svelte/transition';

    let languageId: string;
    let toastType: string | undefined
    let visible = false;

    toastStore.subscribe(value => {
        if(!!value.languageId){
            visible = true
            languageId = value.languageId
            toastType = value.type || 'info'
            let timeout = languageId.length *300
            setTimeout(() => {
                visible = false;
            }, timeout)
        }
    })
</script>

<style>
    .success {
        background-color: green;
        color: white;
    }
    .warn {
        background-color: orangered;
        color: white;
    }
</style>

{#if visible}
    <div class="kui-toast" out:slide class:success={toastType === 'success'} class:warn={toastType === 'warn'}>
        <p class="kui-pri" data-l10n-id={languageId}></p>
    </div>
{/if}
