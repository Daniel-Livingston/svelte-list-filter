<script lang="ts">
  import trimStart from "lodash/trimStart";
  import trimEnd from "lodash/trimEnd";
  import truncate from "lodash/truncate";
  import capitalize from "lodash/capitalize";
  import { decode } from "html-entities";
  import FilteredList from "./FilteredList/index.svelte";
  import type {
    ListItemType,
    FilterItemType,
  } from "./FilteredList/index.svelte";

  interface JobOpeningItemType extends ListItemType {
    department: string;
    location: string;
    region: string;
  }

  export const apiUrl = encodeURI(
    "https://ccrt.co/wp-json/wp/v2/posts?categories=31&per_page=100&orderby=title&order=asc"
  );

  function getListItems(data: any): JobOpeningItemType[] {
    return data.map((post: any) => {
      let excerpt: string = trimStart(post.excerpt.rendered, "<p>");
      excerpt = trimEnd(excerpt, "</p>\n");
      excerpt = truncate(excerpt, { length: 250 });
      excerpt = decode(excerpt);

      return {
        id: post.acf.job_id,
        title: `${decode(post.title.rendered)} (${post.acf.job_id})`,
        href: post.link,
        subtitle: `${post.acf.job_region} | ${post.acf.job_department} | ${post.acf.job_location}`,
        excerpt,
        department: post.acf.job_department,
        location: post.acf.job_location,
        region: post.acf.job_region,
      };
    });
  }

  function getFilters(items: JobOpeningItemType[]): FilterItemType[] {
    return ["region", "department"].map((id) => {
      return {
        id,
        name: capitalize(id),
        items: items
          .map((item) => item[id])
          .filter((value, index, self) => self.indexOf(value) === index),
        active: [],
      };
    });
  }

  function getActiveItems(
    items: JobOpeningItemType[],
    filters: FilterItemType[]
  ): JobOpeningItemType[] {
    return items.filter((item) => {
      return filters.every(({ id, active }) => {
        if (active.length !== 0 && !active.includes(item[id])) return false;
        return true;
      });
    });
  }

  let promise = fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const items = getListItems(data);
      const filters = getFilters(items);
      return {
        items,
        filters,
      };
    });
</script>

{#await promise then data}
  <FilteredList items={data.items} filters={data.filters} {getActiveItems} />
{/await}
