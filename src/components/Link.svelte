<script lang="ts">
    export let href: string;
</script>

<style>
    a {
        font-weight: 700;
    }
</style>

<a href={href} class="kui-text navigation"><slot /></a>
