<script lang="ts">
    import { slide } from "svelte/transition";
    import capitalize from "lodash/capitalize";
    import ToggleIcon from "./ToggleIcon.svelte";

    export let name: string;
    export let items: string[];
    export let active: string[];

    let open: boolean = true;
</script>

<dl>
    <dt>
        <button on:click={() => (open = !open)}>
            {capitalize(name)}
            <ToggleIcon {open} />
        </button>
    </dt>
    <dd>
        {#if open}
            <ul transition:slide={{ duration: 200 }}>
                {#each items as item (item)}
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                bind:group={active}
                                {name}
                                value={item}
                            />
                            {item}
                        </label>
                    </li>
                {/each}
            </ul>
        {/if}
    </dd>
</dl>

<style>
    dl {
        padding: 1rem 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin: 0.5em 0;
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
        margin: 0;
        text-align: start;
    }

    label {
        font-size: 1rem;
    }

    :global(dl) + dl {
        border-top: 1px solid rgba(0, 0, 0, 0.15);
    }
</style>
