<script lang="ts">
    export let href: string;
</script>

<style>
    a {
        font-weight: 700;
        text-decoration: none;
        color: black;
        padding: 5px;
    }
    a:active, a:focus, a:hover {
        text-decoration: underline;
    }
    a:visited {
        color: black;
    }
</style>

<a href={href} class="kui-text navigation" target="_blank"><slot /></a>
