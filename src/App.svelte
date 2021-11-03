<script lang="ts">
    const apiUrl = encodeURI(
        "https://ccrt.co/wp-json/wp/v2/posts?categories=31&per_page=100&orderby=title&order=asc"
    );
    function dataHandler(data: any[]): {
        title: string;
        id: string;
        department: string;
        location: string;
        region: string;
        excerpt: string;
        href: string;
    }[] {
        return data.map((post: any) => {
            return {
                title: post.title.rendered,
                id: post.acf.job_id,
                department: post.acf.job_department,
                location: post.acf.job_location,
                region: post.acf.job_region,
                excerpt: post.excerpt.rendered,
                href: post.link,
            };
        });
    }

    import ListFilter from "./ListFilter.svelte";
</script>

<ListFilter {apiUrl} {dataHandler} filterKeys={["region", "department"]} />
