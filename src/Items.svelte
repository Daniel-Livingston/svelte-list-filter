<script lang="ts">
    export let items: any[];
    export let filtersOpen: boolean;

    import Opening from "./Opening.svelte";
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";
</script>

<div class="items">
    <button
        class="et_pb_button et_pb_button_0 et_pb_bg_layout_light"
        on:click={() => (filtersOpen = true)}>Open Filters</button
    >

    {#each items as opening (opening.id)}
        <div animate:flip={{ duration: 300 }} in:fade={{ duration: 200 }}>
            <Opening {...opening} />
        </div>
    {/each}
</div>

<style>
    .items {
        padding-left: 2rem;
    }

    .items > div + div {
        border-top: 1px solid rgba(0, 0, 0, 0.15);
    }

    /* Tablet and Desktop styles */
    @media screen and (min-width: 980px) {
        button {
            display: none;
        }

        .items {
            grid-column: 2 / 3;
        }
    }
</style>
