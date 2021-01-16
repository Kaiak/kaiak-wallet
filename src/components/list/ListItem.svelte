<style>
    li {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 10px;
    }
    li:focus {
        background-color: #676686;
        outline: 0;
    }
    :global(.kui-list li:focus) {
        color: #fff;
    }
</style>

<li tabindex="1" class="navigation" on:click>
    <div class="kui-list-cont">
        <slot />
    </div>
</li>
