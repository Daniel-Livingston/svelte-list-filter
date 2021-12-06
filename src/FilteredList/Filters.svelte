<script lang="ts">
  import { slide } from "svelte/transition";
  import FilterItem, { FilterItemType } from "./FilterItem.svelte";
  import DropdownIcon from "./DropdownIcon.svelte";

  export let filters: FilterItemType[];

  let mobileOpen: boolean = false;
  let w: number;

  function resetActiveFilters() {
    filters.forEach((filter) => {
      filter.active = [];
    });
    filters = filters;
  }
</script>

<svelte:window bind:innerWidth={w} />

{#if w < 980}
  <div class="filters-sm">
    <button class="toggle-mobile" on:click={() => (mobileOpen = !mobileOpen)}>
      Open filters
      <DropdownIcon expanded={mobileOpen} />
    </button>

    {#if mobileOpen}
      <div transition:slide>
        {#each filters as filter (filter.id)}
          <FilterItem {...filter} bind:active={filter.active} mobile />
        {/each}

        <button class="reset" on:click={resetActiveFilters}>Reset all</button>
      </div>
    {/if}
  </div>
{/if}

<div class="filters-lg">
  {#each filters as filter (filter.id)}
    <FilterItem {...filter} bind:active={filter.active} />
  {/each}

  <button
    class="reset et_pb_button et_pb_button_0 et_pb_bg_layout_light"
    on:click={resetActiveFilters}>Reset all</button
  >
</div>

<style>
  .filters-sm {
    margin-bottom: 1rem;
  }

  .filters-sm > div {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-top: 1rem;
    padding-bottom: 1rem;
  }

  .filters-lg {
    display: none;
    padding-right: 1rem;
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }

  button.toggle-mobile {
    display: flex;
    background: none;
    border: none;
    padding: 0.25rem 0;
    text-decoration: underline;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .filters-sm button.reset {
    background: none;
    border: none;
    text-decoration: underline;
  }

  button.reset {
    width: 100%;
  }

  /* Tablet and Desktop styles */
  @media screen and (min-width: 980px) {
    .filters-lg {
      display: block;
    }

    button.toggle-mobile {
      display: none;
    }
  }
</style>
