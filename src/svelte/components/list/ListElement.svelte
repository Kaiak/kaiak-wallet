<script>
    export let text;
    export let onClick;
</script>

<li tabindex="1" class="navigation" on:click={onClick}>
    <div class="kui-list-cont">
        <p class="kui-pri">{text}</p>
    </div>
</li>
