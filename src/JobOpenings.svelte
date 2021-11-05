<script lang="ts">
    import Component from "./component/index.svelte";
    import {
        apiUrl,
        dataHandler,
        getFilters,
        getDisplayedItems,
    } from "./openings";

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
    <Component items={data.items} filters={data.filters} {getDisplayedItems} />
{/await}
