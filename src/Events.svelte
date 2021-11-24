<script lang="ts">
  import Component from "./component/index.svelte";
  import { apiUrl, dataHandler, getFilters, getActiveItems } from "./events";

  let promise = fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const items = dataHandler(data);
      const filters = getFilters(items);
      return {
        items,
        filters,
      };
    });
</script>

{#await promise then data}
  <Component items={data.items} {getActiveItems} />
{/await}
