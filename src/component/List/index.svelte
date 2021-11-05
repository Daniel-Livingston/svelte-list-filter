<script lang="ts">
    import Item from "./Item.svelte";
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";
    import type { ListItemData } from "../../types";

    export let items: ListItemData[];
    export let filtersOpen: boolean;
</script>

<div class="items">
    <button
        class="et_pb_button et_pb_button_0 et_pb_bg_layout_light"
        on:click={() => (filtersOpen = true)}>Open Filters</button
    >

    {#each items as item (item.id)}
        <div animate:flip={{ duration: 300 }} in:fade={{ duration: 200 }}>
            <Item {...item} />
        </div>
    {/each}
</div>

<style>
    .items {
        padding-left: 2rem;
    }

    .items > div + div {
        border-top: 1px solid rgba(0, 0, 0, 0.15);
    }

    /* Tablet and Desktop styles */
    @media screen and (min-width: 980px) {
        button {
            display: none;
        }

        .items {
            grid-column: 2 / 3;
        }
    }
</style>
