<script lang="ts" context="module">
  export type { FilterItemType } from "./FilterItem.svelte";
  export type { ListItemType } from "./ListItem.svelte";
</script>

<script lang="ts">
  import Filters from "./Filters.svelte";
  import type { FilterItemType } from "./FilterItem.svelte";
  import List from "./List.svelte";
  import type { ListItemType } from "./ListItem.svelte";

  export let filters: FilterItemType[] = [];
  export let items: ListItemType[];
  export let getActiveItems: (
    items: ListItemType[],
    filters: FilterItemType[]
  ) => ListItemType[] = undefined;

  const increment = 10;

  let maxDisplayed: number = increment;

  $: hasFilters = filters.length > 0;
  $: activeItems = getActiveItems ? getActiveItems(items, filters) : items;
  $: displayedItems = activeItems.slice(0, maxDisplayed);
  $: canShowMore = activeItems.length > maxDisplayed;

  function showMore() {
    maxDisplayed += increment;
  }
</script>

<div class="filtered-list" class:hasFilters>
  {#if hasFilters}
    <Filters bind:filters />
  {/if}

  <div class="list-items">
    <List items={displayedItems} />
    {#if canShowMore}
      <div class="show-more-bar">
        <button on:click={showMore}>
          <span>Show more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            />
          </svg>
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .filtered-list {
    max-width: calc(1400px + var(--filter-width, 0px));
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .filtered-list.hasFilters {
    --filter-width: 200px;
  }

  .filtered-list :global(button) {
    cursor: pointer;
  }

  .show-more-bar {
    display: flex;
    justify-content: center;
  }

  .show-more-bar button {
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .show-more-bar button svg {
    transition: transform 0.3s;
  }

  .show-more-bar button:hover svg,
  .show-more-bar button:focus svg {
    transform: translateY(20%);
  }

  @media screen and (min-width: 980px) {
    .hasFilters {
      display: grid;
      grid-template-columns: var(--filter-width) 1fr;
    }

    .list-items:not(:first-child) {
      padding-left: 1rem;
    }
  }
</style>
