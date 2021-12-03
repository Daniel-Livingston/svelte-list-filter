<script lang="ts">
  import trimStart from "lodash/trimStart";
  import trimEnd from "lodash/trimEnd";
  import truncate from "lodash/truncate";
  import { format } from "date-fns";
  import { decode } from "html-entities";

  import FilteredList from "./FilteredList/index.svelte";
  import type {
    ListItemType,
    FilterItemType,
  } from "./FilteredList/index.svelte";

  interface PressReleaseItemType extends ListItemType {
    year: string;
  }

  export const apiUrl = encodeURI(
    "https://ccrt.co/wp-json/wp/v2/posts?categories=48&per_page=100"
  );

  function getListItems(data: any): PressReleaseItemType[] {
    return data.map((post: any) => {
      let excerpt: string = trimStart(post.excerpt.rendered, "<p>");
      excerpt = trimEnd(excerpt, "</p>\n");
      excerpt = truncate(excerpt, { length: 250 });
      excerpt = decode(excerpt);

      const date = new Date(post.date);

      return {
        id: post.id,
        title: decode(post.title.rendered),
        href: post.acf.url ? post.acf.url : post.link,
        excerpt,
        mediaId: post.featured_media,
        month: format(date, "MMM"),
        day: format(date, "d"),
        fullDate: format(date, "LLLL do, yyyy"),
        year: format(date, "yyyy"),
      };
    });
  }

  function getFilters(items: PressReleaseItemType[]): FilterItemType[] {
    return [
      {
        id: "year",
        name: "Year",
        items: items
          .map((item) => item.year)
          .filter((value, index, self) => self.indexOf(value) === index),
        active: [],
      },
    ];
  }

  function getActiveItems(
    items: PressReleaseItemType[],
    filters: FilterItemType[]
  ): PressReleaseItemType[] {
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
