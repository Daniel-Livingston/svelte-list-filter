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
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li + li {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }
</style>
