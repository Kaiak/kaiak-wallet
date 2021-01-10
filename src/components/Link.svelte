<script lang="ts">
    export let href: string;
</script>

<style>
    a {
        font-weight: 700;
        text-decoration: none;
        color: black;
    }
    a:active, a:focus {
        text-decoration: underline;
    }
    a:visited {
        color: black;
    }
</style>

<a href={href} class="kui-text navigation" target="_blank"><slot /></a>
