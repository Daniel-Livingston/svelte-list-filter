<script lang="ts">
    export let title: string;
    export let smallTitle: string = "";
    export let href: string;
    export let subtitle: string = "";
    export let excerpt: string = "";
    export let featuredMedia: number = 0;
    export let links: { label: string; href: string }[] = [];

    let promise: Promise<any>;

    if (featuredMedia) {
        promise = fetch(
            encodeURI(`https://ccrt.co/wp-json/wp/v2/media/${featuredMedia}`)
        )
            .then((response) => response.json())
            .then((data) => ({
                src: data.media_details.sizes.thumbnail.source_url,
                alt: data.alt_text,
                width: "150px",
                height: "150px",
            }));
    }
</script>

<section>
    {#if promise}
        {#await promise then { src, alt, width, height }}
            <img {src} {alt} {width} {height} />
        {/await}
    {/if}
    <div>
        <header>
            <h4>
                <a class="link" {href}>
                    {title}
                    {#if smallTitle}
                        <small>{smallTitle}</small>
                    {/if}
                </a>
            </h4>
            {#if subtitle}
                <small>{subtitle}</small>
            {/if}
        </header>
        <div class="content">
            {#if excerpt}
                <p>{excerpt}</p>
            {/if}

            {#if links}
                <div class="links">
                    {#each links as { label, href }}
                        <a class="link" {href}>{label}</a>
                    {/each}
                </div>
            {/if}
        </div>
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
    h4 {
        color: #055aa2;
        padding: 0;
        margin: 0;
        font-size: 1.4rem;
    }
    small {
        font-size: 0.8rem;
    }
    p {
        margin-top: 1rem;
    }
    .links {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }
</style>
