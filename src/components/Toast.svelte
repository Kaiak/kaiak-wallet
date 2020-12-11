<script lang="ts">
    import {toastStore} from "../stores/stores";
    import { slide } from 'svelte/transition';

    let body: string;
    let visible = false;

    toastStore.subscribe(value => {
        if(!!body){
            visible = true
            body = value.body
            let timeout = body.length *300
            setTimeout(() => {
                visible = false;
            }, timeout)
        }
    })
</script>

{#if visible}
    <div class="kui-toast" out:slide>
        <p class="kui-pri">{body}</p>
    </div>
{/if}
