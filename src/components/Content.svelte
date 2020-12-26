<script lang="ts">
    export let titleKey: string
    export let title: string | undefined
</script>

<style>

    .kui-content-area{
        /*overflow: hidden;*/
        overflow: scroll;
        position: relative;
    }

    .kui-header {
        height: 28px;
        line-height: 28px;
        background-color: #529aee;
        color: #fff;
        text-align: center;
        margin-top: -0.7em;
        margin-bottom: 10px;
    }

    .kui-h1 {
        font-size: 17px;
        font-weight: 300;
    }

    @media screen and (orientation: landscape) {
        .kui-content-area {
            height: 156px;
        }
    }
    /* KaiOS portrait devices (240x320) */
    @media only screen and (orientation : portrait) {
        .kui-content-area {
            height: 15.8rem;
        }
    }
</style>

<div class="kui-header">
    <h1 class="kui-h1" data-l10n-id={titleKey}>{title}</h1>
</div>
<div class="kui-content-area">
    <slot />
</div>
