<script lang="ts" context="module">
  export interface ListItemType {
    id: string;
    title: string;
    href: string;

    subtitle?: string;
    excerpt?: string;
    mediaId?: string | number;
    links?: { label: string; href: string }[];
  }
</script>

<script lang="ts">
  import getThumbnail from "./getThumbnail";

  export let title: string;
  export let href: string;

  export let subtitle: string = "";
  export let excerpt: string = "";
  export let mediaId: string | number | undefined = undefined;
  export let links: { label: string; href: string }[] = [];

  let promise;
  if (mediaId) promise = getThumbnail(mediaId);
</script>

<section>
  {#if promise}
    {#await promise then thumbnail}
      <img src={thumbnail.src} alt={thumbnail.alt} />
    {/await}
  {/if}

  <div>
    <header>
      <h3 class="title"><a class="link" {href}>{title}</a></h3>

      {#if subtitle}
        <p><small>{subtitle}</small></p>
      {/if}
    </header>

    {#if excerpt}
      <p>{excerpt}</p>
    {/if}

    {#if links}
      <footer>
        {#each links as { label, href } (label)}
          <a class="link" {href}>{label}</a>
        {/each}
      </footer>
    {/if}
  </div>
</section>

<style>
  :global(li:first-child) section {
    padding-top: 0;
  }

  :global(li:last-child) section {
    padding-bottom: 0;
  }

  section {
    padding: 2rem 0;
    display: flex;
    gap: 1rem;
  }

  img {
    align-self: flex-start;
  }

  .title {
    color: #055aa2;
    padding: 0;
    margin: 0;
    font-size: 1.4rem;
  }

  header p {
    margin-top: 0;
  }

  small {
    font-size: 0.8rem;
  }

  p:not(header p) {
    margin-top: 1rem;
  }

  footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
</style>
