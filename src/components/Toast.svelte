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
    .kui-pri {
        font-size: 17px;
        font-weight: 400;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
    }
    .kui-toast {
        line-height: 33px;
        color: #fff;
        text-align: center;
        background-color: #212529;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 99;
        box-shadow: -1px -1px 5px 3px rgba(0,0,0,0.43);
        -webkit-box-shadow: -1px -1px 5px 3px rgba(0,0,0,0.43);
        -moz-box-shadow: -1px -1px 5px 3px rgba(0,0,0,0.43);
    }

    .kui-toast .kui-pri {
        margin: 0;
    }
    p {
        margin: 0;
        padding: 0;
    }
</style>

{#if visible}
    <div class="kui-toast" out:slide class:success={toastType === 'success'} class:warn={toastType === 'warn'}>
        <p class="kui-pri" data-l10n-id={languageId}></p>
    </div>
{/if}
