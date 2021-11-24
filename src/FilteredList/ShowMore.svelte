<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div>
  <button on:click={() => dispatch("showMore")}>
    <span>Show more</span>

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
  </button>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
  }

  button {
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  svg {
    transition: transform 0.3s;
  }

  button:hover svg,
  button:focus svg {
    transform: translateY(20%);
  }
</style>
