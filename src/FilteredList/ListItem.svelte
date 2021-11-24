<script lang="ts" context="module">
  export type ListItemType = {
    id: string;
    title: string;
    href: string;

    subtitle?: string;
    excerpt?: string;
    thumbnail?: { src: string; alt: string };
    links?: { label: string; href: string }[];
  };
</script>

<script lang="ts">
  export let title: string;
  export let href: string;

  export let subtitle: string = "";
  export let excerpt: string = "";
  export let thumbnail: { src: string; alt: string } | undefined = undefined;
  export let links: { label: string; href: string }[] = [];
</script>

<section>
  {#if thumbnail}
    <img src={thumbnail.src} alt={thumbnail.alt} />
  {/if}

  <div>
    <header>
      <h3 class="title"><a {href}>{title}</a></h3>

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
          <a {href}>{label}</a>
        {/each}
      </footer>
    {/if}
  </div>
</section>

<style>
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
