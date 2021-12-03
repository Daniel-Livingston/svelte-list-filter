<script lang="ts" context="module">
  export interface ListItemType {
    id: string;
    title: string;
    href: string;

    month?: string;
    day?: string;
    fullDate?: string;
    subtitle?: string;
    excerpt?: string;
    mediaId?: string | number;
  }
</script>

<script lang="ts">
  import getThumbnail from "./getThumbnail";

  export let id: string;
  export let title: string;
  export let href: string;

  export let month: string = "";
  export let day: string = "";
  export let fullDate: string = "";
  export let subtitle: string = "";
  export let excerpt: string = "";
  export let mediaId: string | number | undefined = undefined;

  let promise;
  if (mediaId) promise = getThumbnail(mediaId);
</script>

<section>
  {#if month && day}
    <div class="date">
      <strong class="month">{month}</strong>
      <strong class="day">{day}</strong>
    </div>
  {/if}

  <div>
    <header>
      {#if fullDate}
        <p><small>{fullDate}</small></p>
      {/if}
      <h3 id="title-{id}" class="title"><a class="link" {href}>{title}</a></h3>

      {#if subtitle}
        <p><small>{subtitle}</small></p>
      {/if}
    </header>

    {#if excerpt}
      <p>{excerpt}</p>
    {/if}

    <footer>
      <a class="link" {href} aria-label="Continue reading {title}"
        >Continue reading</a
      >
    </footer>
  </div>

  {#if promise}
    {#await promise then thumbnail}
      <a class="image-wrapper" {href} aria-labelledby="title-{id}"
        ><img src={thumbnail.src} alt={thumbnail.alt} /></a
      >
    {/await}
  {/if}
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
    align-items: center;
    gap: 1rem;
  }

  .date {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    padding-right: 2rem;
  }

  .image-wrapper {
    display: block;
    max-width: 400px;
    width: 100%;
  }

  img {
    display: block;
    width: 100%;
  }

  .title {
    color: #000;
    padding: 0;
    margin: 0;
    font-size: 1.4rem;
  }

  .title a {
    color: inherit;
  }

  small {
    font-size: 1rem;
  }

  p:not(header p) {
    margin-top: 1rem;
  }

  footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  @media screen and (max-width: 768px) {
    section {
      flex-direction: column;
    }
  }
</style>
