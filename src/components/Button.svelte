<script lang="ts">
    export let text: string;
    export let languageId: string;
</script>

<style>
    .kui-btn{
        font-size: 17px;
        font-weight: 400;
    }
    button.kui-btn {
        width: 220px;
        height: 36px;
        border-radius: 2px;
        background: #ccc;
        text-align: center;
        color: #212529;
        border: 0;
        display: block;
        margin: 0 0 10px 10px;
    }
    button.kui-btn:focus {
        outline: 0;
        color: #fff;
        background-color: #60a5f5;
    }
</style>

<button class="navigation kui-btn" data-l10n-id="{languageId}" on:click>{text}</button>

