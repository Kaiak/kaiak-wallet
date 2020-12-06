<script lang="ts">
    import {pushMenu} from "../machinery/eventListener";

    const toggleMenu = () => pushMenu('menu')
</script>

<div class="kui-software-key">
    <h5 role="button" class="kui-h5 kui-text-left" id="kui-left-soft-key"></h5>
    <h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" id="kui-middle-soft-key"></h5>
    <h5 role="button" class="kui-h5 kui-text-right" on:click={toggleMenu} data-l10n-id="rightNavButton"></h5>
</div>
