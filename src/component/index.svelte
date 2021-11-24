<script lang="ts">
  import FilterPanel from "./FilterPanel/index.svelte";
  import List from "./List/index.svelte";
  import type { ListItemData, ListFilter } from "../types";

  export let items: ListItemData[] = [];
  export let filters: ListFilter[] = [];
  export let getActiveItems: (
    items: ListItemData[],
    filters: ListFilter[]
  ) => ListItemData[];

  let maxDisplayed: number = 10;
  $: hasFilters = filters.length > 0;
  let filtersOpen: boolean = false;
  let activeItems: ListItemData[] = [];
  $: activeItems = getActiveItems(items, filters);

  let displayedItems: ListItemData[] = [];
  $: displayedItems = activeItems.slice(0, maxDisplayed);

  let canShowMore: boolean = false;
  $: canShowMore = activeItems.length > maxDisplayed;

  function showMore() {
    maxDisplayed += 10;
  }

  function resetActiveFilters() {
    filters.forEach((filter) => {
      filter.active = [];
    });

    filters = filters;
  }
</script>

<div class:filters={hasFilters}>
  {#if hasFilters}
    <FilterPanel
      bind:filters
      bind:mobileOpen={filtersOpen}
      {resetActiveFilters}
    />
  {/if}

  <List items={displayedItems} bind:filtersOpen {canShowMore} {showMore} />
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
    .filters {
      display: grid;
      grid-template-columns: 200px 1fr;
    }
  }
</style>
