<script>
    import ListElement from "./list/ListElement.svelte";
    export let elements;
</script>

<ul class="kui-list">
    {#each elements as el}
        {#if el.type === 'primary'}
            <ListElement text={el.primaryText}/>
        {/if}
    {/each}
</ul>
