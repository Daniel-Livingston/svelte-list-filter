<script>
    import trimStart from "lodash/trimStart";
    import trimEnd from "lodash/trimEnd";
    import truncate from "lodash/truncate";

    export let title;
    export let id;
    export let location;
    export let department;
    export let excerpt;
    export let href;
    export let region;

    let cleanedExcerpt = trimStart(excerpt, "<p>");
    cleanedExcerpt = trimEnd(cleanedExcerpt, "</p>\n");
    cleanedExcerpt = truncate(cleanedExcerpt, { length: 256 });
</script>

<section>
    <h4><a class="link" {href}>{title} <small>({id})</small></a></h4>
    <small>{region} | {department} | {location} </small>
    <div>
        <p>{cleanedExcerpt}</p>
        <div class="links">
            <a class="link" {href}>See details</a>
            <a class="link" href="https://ccrt.co/company/careers/apply?id={id}"
                >Apply</a
            >
        </div>
    </div>
</section>

<style>
    section {
        padding: 2rem 0;
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
    div {
        margin-top: 1rem;
    }
    .links {
        display: flex;
        justify-content: space-between;
    }
</style>
