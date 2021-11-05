<script lang="ts">
    import FilterPanel from "./FilterPanel/index.svelte";
    import List from "./List/index.svelte";
    import type { ListItemData, ListFilter } from "../types";

    export let items: ListItemData[] = [];
    export let filters: ListFilter[] = [];
    export let getDisplayedItems: (
        items: ListItemData[],
        filters: ListFilter[]
    ) => ListItemData[];

    let filtersOpen: boolean = false;
    let displayedItems: ListItemData[] = [];
    $: displayedItems = getDisplayedItems(items, filters);

    function resetActiveFilters() {
        filters.forEach((filter) => {
            filter.active = [];
        });

        filters = filters;
    }
</script>

<div>
    <FilterPanel
        bind:filters
        bind:mobileOpen={filtersOpen}
        {resetActiveFilters}
    />
    <List items={displayedItems} bind:filtersOpen />
</div>

<style>
    div :global(button) {
        color: #055aa2;
        cursor: pointer;
    }

    div :global(button:focus-visible) {
        outline: 1px solid black;
    }

    /* Tablet and Desktop styles */
    @media screen and (min-width: 980px) {
        div {
            display: grid;
            grid-template-columns: 200px 1fr;
        }
    }
</style>
