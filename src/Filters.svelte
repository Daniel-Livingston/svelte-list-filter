<script lang="ts">
    import type { Filter as FilterType } from "./types";

    // The list of filters
    export let filters: FilterType[];

    // Determines whether the filters window is open on mobile
    export let open: boolean;

    // A function to reset the active filters
    export let resetActiveFilters: () => void;

    import Filter from "./Filter.svelte";
</script>

<div class:open>
    <button class="close-filters" on:click={() => (open = false)}>
        <!-- <span class="screen-reader-text">Close filters</span> -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
        >
            <path
                fill-rule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
            />
            <path
                fill-rule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
            />
        </svg></button
    >

    {#each filters as { title, items, active }}
        <Filter {title} {items} bind:active />
    {/each}

    <button
        class="reset et_pb_button et_pb_button_0 et_pb_bg_layout_light"
        on:click={resetActiveFilters}>Reset all</button
    >
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
