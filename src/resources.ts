import trimStart from "lodash/trimStart";
import trimEnd from "lodash/trimEnd";
import truncate from "lodash/truncate";
import { decode } from "html-entities";
import type { ListFilter, ResourceData } from "./types";

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

export function dataHandler(data: any): ResourceData[] {
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
            links: [
                {
                    label: "See the full resource",
                    href: post.acf.url ? post.acf.url : post.link,
                },
            ],
            products,
            type,
        };
    });
}

export function getFilters(items: ResourceData[]): ListFilter[] {
    return [
        {
            name: "products",
            items: Object.values(products),
            active: [],
        },
        {
            name: "type",
            items: Object.values(types),
            active: [],
        },
    ];
}

export function getActiveItems(
    items: ResourceData[],
    filters: ListFilter[]
): ResourceData[] {
    return items.filter((item) => {
        return filters.every(({ name, active }) => {
            if (name === "type") {
                return !(active.length !== 0 && !active.includes(item[name]));
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
