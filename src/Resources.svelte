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

  interface ResourceItemType extends ListItemType {
    products: string[];
    type: string;
  }

  export const apiUrl = encodeURI(
    "https://ccrt.co/wp-json/wp/v2/posts?categories=38&per_page=100&orderby=title&order=asc"
  );

  const products = {
    60: "DCIM",
    55: "FPGA Workbench",
    58: "GPU Workbench",
    52: "I/O Cards",
    56: "iHawk",
    57: "ImaGen",
    54: "NightStar",
    53: "RedHawk Architect",
    44: "RedHawk KVM-RT",
    39: "RedHawk Linux",
    59: "SIGnal Workbench",
    45: "SIMulation Workbench",
  };

  const types = {
    42: "Brochures",
    41: "Case Studies",
    43: "Data Sheets",
    51: "Videos",
    40: "White Papers",
  };

  function getListItems(data: any): ResourceItemType[] {
    return data.map((post: any) => {
      let excerpt: string = trimStart(post.excerpt.rendered, "<p>");
      excerpt = trimEnd(excerpt, "</p>\n");
      excerpt = truncate(excerpt, { length: 250 });
      excerpt = decode(excerpt);

      const products = getProducts(post);
      const type = getType(post);

      return {
        id: post.id,
        title: decode(post.title.rendered),
        href: post.acf.url ? post.acf.url : post.link,
        subtitle: `${products.join(", ")} | ${type}`,
        excerpt,
        products,
        type,
      };
    });
  }

  function getFilters(_: ResourceItemType[]): FilterItemType[] {
    return [
      {
        id: "products",
        name: "Products",
        items: Object.values(products),
        active: [],
      },
      {
        id: "type",
        name: "Type",
        items: Object.values(types),
        active: [],
      },
    ];
  }

  function getActiveItems(
    items: ResourceItemType[],
    filters: FilterItemType[]
  ): ResourceItemType[] {
    return items.filter((item) => {
      return filters.every(({ id, active }) => {
        if (id === "type") {
          return !(active.length !== 0 && !active.includes(item[id]));
        }

        if (active.length === 0) return true;
        return item.products.some((product) => active.includes(product));
      });
    });
  }

  function getProducts(item: any): string[] {
    return item.categories
      .filter((id: number) => products[id])
      .map((id: number) => products[id]);
  }

  function getType(item: any): string {
    const id = item.categories.find((id: number) => types[id]);
    return types[id];
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
