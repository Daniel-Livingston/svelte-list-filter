<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import ListItem from "./ListItem.svelte";
  import type { ListItemType } from "./ListItem.svelte";

  export let items: ListItemType[];
</script>

<ul>
  {#each items as item (item.id)}
    <li animate:flip={{ duration: 300 }} in:fade={{ duration: 200 }}>
      <ListItem {...item} />
    </li>
  {/each}
</ul>

<style>
  li + li {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }

  @media screen and (min-width: 980px) {
    ul {
      grid-column: 2 / 3;
      padding-left: 1rem;
    }
  }
</style>
