<script lang="ts" context="module">
  export type FilterItemType = {
    id: string;
    name: string;
    items: string[];
    active: string[];
  };
</script>

<script lang="ts">
  import { slide } from "svelte/transition";
  import DropdownIcon from "./DropdownIcon.svelte";

  export let id: string;
  export let name: string;
  export let items: string[];
  export let active: string[];
  export let mobile: boolean = false;

  let expanded: boolean = true;
</script>

<div id="{id}-filter" class:mobile>
  <!-- The button to expand and collapse the filter item -->
  <button
    on:click={() => (expanded = !expanded)}
    aria-expanded={expanded}
    aria-label="{expanded ? 'Close' : 'Open'} {name} filter"
  >
    {name}

    <DropdownIcon {expanded} />
  </button>

  <!-- The checkboxes for the filter item. -->
  {#if expanded}
    <fieldset transition:slide|local>
      <legend class="screen-reader-text">Select the {name}</legend>
      {#each items as item (item)}
        <label>
          <input type="checkbox" bind:group={active} name={id} value={item} />
          {item}
        </label>
      {/each}
    </fieldset>
  {/if}
</div>

<style>
  div {
    padding: 1rem 0;
  }

  div.mobile {
    padding: 1rem;
    flex: 1 1 10%;
    min-width: 200px;
  }

  button {
    background: none;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    cursor: pointer;
    width: 100%;
    padding: 0;
    text-align: start;
  }

  fieldset {
    margin: 0;
    padding: 0;
    border: none;
    margin-top: 0.5rem;
  }

  label {
    display: block;
    font-size: 1rem;

    padding: 2px 2px;
    margin-left: 22px;
    text-indent: -24px;
  }

  :global(div) + div:not(.mobile) {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }
</style>
