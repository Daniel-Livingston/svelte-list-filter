<script lang="ts">
  import Item from "./Item.svelte";
  import DownIcon from "./DownIcon.svelte";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import type { ListItemData } from "../../types";

  export let items: ListItemData[];
  export let filtersOpen: boolean;
  export let canShowMore: boolean;
  export let showMore: () => void;
</script>

<div class="items">
  <button
    class="open et_pb_button et_pb_button_0 et_pb_bg_layout_light"
    on:click={() => (filtersOpen = true)}>Open Filters</button
  >

  {#each items as item (item.id)}
    <div animate:flip={{ duration: 300 }} in:fade={{ duration: 200 }}>
      <Item {...item} />
    </div>
  {/each}

  {#if canShowMore}
    <div class="show-more-bar">
      <div>
        <button on:click={showMore}
          ><div>Show more</div>
          <DownIcon /></button
        >
      </div>
    </div>
  {/if}
</div>

<style>
  .items > div + div:not(.show-more-bar) {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }

  .show-more-bar {
    display: flex;
    justify-content: center;
  }

  .show-more-bar > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .show-more-bar button {
    background: none;
    border: none;
  }

  .show-more-bar button :global(svg) {
    transition: transform 0.3s;
  }

  .show-more-bar button:hover :global(svg),
  .show-more-bar button:focus :global(svg) {
    transform: translateY(20%);
  }

  .show-more-bar {
    display: flex;
    justify-content: center;
  }

  .show-more-bar > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .show-more-bar button {
    background: none;
    border: none;
  }

  .show-more-bar button :global(svg) {
    transition: transform 0.3s;
  }

  .show-more-bar button:hover :global(svg),
  .show-more-bar button:focus :global(svg) {
    transform: translateY(20%);
  }

  /* Tablet and Desktop styles */
  @media screen and (min-width: 980px) {
    button.open {
      display: none;
    }

    .items {
      grid-column: 2 / 3;
      padding-left: 1rem;
    }
  }
</style>
