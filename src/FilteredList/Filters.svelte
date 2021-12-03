<script lang="ts">
  import FilterItem, { FilterItemType } from "./FilterItem.svelte";

  export let filters: FilterItemType[];

  let lastFocused: Element;
  let mobileOpen: boolean = false;

  function openModal() {
    lastFocused = document.activeElement;
    mobileOpen = true;
  }

  function closeModal() {
    mobileOpen = false;
    lastFocused && (lastFocused as HTMLElement).focus();
  }

  function resetActiveFilters() {
    filters.forEach((filter) => {
      filter.active = [];
    });
    filters = filters;
  }
</script>

<button
  class="open et_pb_button et_pb_button_0 et_pb_bg_layout_light"
  on:click={openModal}>Open filters</button
>

<div class:open={mobileOpen}>
  <button class="close" on:click={closeModal}>
    <span class="screen-reader-text">Close filters</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
      />
      <path
        fill-rule="evenodd"
        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
      />
    </svg>
  </button>

  {#each filters as filter (filter.id)}
    <FilterItem {...filter} bind:active={filter.active} />
  {/each}

  <button
    class="reset et_pb_button et_pb_button_0 et_pb_bg_layout_light"
    on:click={resetActiveFilters}>Reset all</button
  >
</div>

<style>
  div {
    padding-right: 1rem;
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }

  button.open {
    display: block;
    margin-left: auto;
  }

  button.close {
    background: none;
    border: none;
    float: right;
  }

  button.reset {
    width: 100%;
  }

  /* Mobile styles */
  @media screen and (max-width: 980px) {
    div {
      display: none;
      padding: 1rem;
      overflow: auto;
      -webkit-box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.25);
      -moz-box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.25);
      box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.25);
      z-index: 1000000;
    }

    div.open {
      display: block;
      position: fixed;
      width: var(--filter-width);
      top: 0;
      bottom: 0;
      right: 0;
      background-color: #fff;
    }
  }

  /* Tablet and Desktop styles */
  @media screen and (min-width: 980px) {
    button.open {
      display: none;
    }

    button.close {
      display: none;
    }

    div {
      display: block;
    }
  }
</style>
