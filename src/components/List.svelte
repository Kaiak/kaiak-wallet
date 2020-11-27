<script>
    import ListElement from "./list/ListElement.svelte";

    export let elements;
</script>

<ul class="kui-list">
    {#each elements as el, index}
        <ListElement 
            primaryLanguageId={el.primaryLanguageId} 
            secondaryLanguageId={el.secondaryLanguageId}
            primaryText={el.primaryText}
            secondaryText={el.secondaryText}
            onClick={el.onClick}/>
    {/each}
</ul>
