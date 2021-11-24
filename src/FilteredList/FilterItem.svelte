<script lang="ts" context="module">
  export type FilterItemType = {
    id: string;
    name: string;
    items: string[];
    active: string[];
  };
</script>

<script lang="ts">
  export let id: string;
  export let name: string;
  export let items: string[];
  export let active: string[];

  let expanded: boolean = true;
</script>

<div>
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
    <ul>
      {#each items as item (item)}
        <li>
          <label>
            <input type="checkbox" bind:group={active} {name} value={item} />
            {item}
          </label>
        </li>
      {/each}
    </ul>
  {/if}
</div>
