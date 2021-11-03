<script lang="ts">
    import capitalize from "lodash/capitalize";
    import { onMount } from "svelte";
    import { getUniqueValues } from "./utils";
    import type { Filter as FilterType } from "./types";

    // The URL of the API to hit
    export let apiUrl: string;

    // A function mapping the expected data to the desired format
    export let dataHandler: (data: any) => { [key: string]: string }[];

    // The keys to build the filters from
    export let filterKeys: string[];

    let items: { [key: string]: string }[] = [];
    let filters: FilterType[] = [];
    let displayedItems: { [key: string]: string }[] = [];
    let filtersOpen: boolean = false;

    onMount(async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        items = dataHandler(data);
        filters = filterKeys.map((key) => {
            return {
                title: capitalize(key),
                key,
                items: getUniqueValues(items, key),
                active: [],
            };
        });
    });

    $: {
        displayedItems = items.filter((item) => {
            return filters.every(({ key, active }) => {
                if (active.length !== 0 && !active.includes(item[key]))
                    return false;
                return true;
            });
        });
    }

    function resetActiveFilters() {
        filters.forEach((filter) => {
            filter.active = [];
        });

        filters = filters;
    }

    import Filters from "./Filters.svelte";
    import Items from "./Items.svelte";
</script>

<div>
    <Filters bind:filters bind:open={filtersOpen} {resetActiveFilters} />
    <Items items={displayedItems} bind:filtersOpen />
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
