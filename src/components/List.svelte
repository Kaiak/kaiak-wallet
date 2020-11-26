<script>
    import ListElement from "./list/ListElement.svelte";
    import Secondary from "./list/Secondary.svelte";

    export let elements;
</script>

<ul class="kui-list">
    {#each elements as el, index}
        {#if el.type === 'primary'}
            <ListElement text={el.primaryText} onClick={el.onClick}/>
        {:else if el.type === 'secondary'}
            <Secondary primaryText={el.primaryText} secondaryText={el.secondaryText} onClick={el.onClick}/>
        {/if}
    {/each}
</ul>
