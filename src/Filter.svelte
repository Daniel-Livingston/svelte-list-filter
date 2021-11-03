<script lang="ts">
    import { slide } from "svelte/transition";

    export let title: string;
    export let items: string[];
    export let active: string[];

    let open = true;
</script>

<dl>
    <dt>
        <button on:click={() => (open = !open)}>
            {title}
            {#if open}
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
                </svg>{/if}
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
                                name={title}
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
