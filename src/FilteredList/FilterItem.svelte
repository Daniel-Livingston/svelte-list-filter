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

  export let id: string;
  export let name: string;
  export let items: string[];
  export let active: string[];

  let expanded: boolean = true;
</script>

<div id="{id}-filter">
  <!-- The button to expand and collapse the filter item -->
  <button on:click={() => (expanded = !expanded)} aria-expanded={expanded}>
    {name}

    {#if expanded}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
        />
      </svg>
    {:else}
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
    {/if}
  </button>

  <!-- The checkboxes for the filter item. -->
  {#if expanded}
    <fieldset transition:slide>
      <legend class="screen-reader-text">{name}</legend>
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
    margin-top: 1rem;
    padding: 0;
    border: none;
  }

  label {
    display: block;
    font-size: 1rem;
  }

  :global(div) + div {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }
</style>
