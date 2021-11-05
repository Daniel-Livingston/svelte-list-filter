<script lang="ts">
    import Filter from "./Filter.svelte";
    import CloseIcon from "./CloseIcon.svelte";
    import type { ListFilter as FilterType } from "../../types";

    export let filters: FilterType[];
    export let mobileOpen: boolean;
    export let resetActiveFilters: () => void;
</script>

<div class:open={mobileOpen}>
    <button class="close-filters" on:click={() => (mobileOpen = false)}>
        <CloseIcon />
    </button>

    {#each filters as { name, items, active } (name)}
        <Filter {name} {items} bind:active />
    {/each}

    <button
        class="reset et_pb_button et_pb_button_0 et_pb_bg_layout_light"
        on:click={resetActiveFilters}
    >
        Reset all
    </button>
</div>

<style>
    div {
        padding-right: 1rem;
        border-right: 1px solid rgba(0, 0, 0, 0.15);
    }

    button.reset {
        width: 100%;
    }

    button.close-filters {
        background: none;
        border: none;
        float: right;
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
            top: 0;
            bottom: 0;
            left: 20%;
            right: 0;
            background-color: #fff;
        }
    }

    /* Tablet and Desktop styles */
    @media screen and (min-width: 980px) {
        .close-filters {
            display: none;
        }

        div {
            display: block;
            grid-column: 1 / 2;
        }
    }
</style>
