<script lang="ts">
    import {toastStore} from "../stores/stores";
    import { slide } from 'svelte/transition';

    let languageId: string;
    let visible = false;

    toastStore.subscribe(value => {
        if(!!value.languageId){
            visible = true
            languageId = value.languageId
            let timeout = languageId.length *300
            setTimeout(() => {
                visible = false;
            }, timeout)
        }
    })
</script>

{#if visible}
    <div class="kui-toast" out:slide>
        <p class="kui-pri" data-l10n-id={languageId}></p>
    </div>
{/if}
