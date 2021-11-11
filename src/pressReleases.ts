import trimStart from "lodash/trimStart";
import trimEnd from "lodash/trimEnd";
import truncate from "lodash/truncate";
import { format } from "date-fns";
import { decode } from "html-entities";
import type { ListFilter, PressReleaseData } from "./types";

export const apiUrl = encodeURI(
    "https://ccrt.co/wp-json/wp/v2/posts?categories=48&per_page=100"
);

export function dataHandler(data: any): PressReleaseData[] {
    return data.map((post: any) => {
        let excerpt: string = trimStart(post.excerpt.rendered, "<p>");
        excerpt = trimEnd(excerpt, "</p>\n");
        excerpt = truncate(excerpt, { length: 250 });
        excerpt = decode(excerpt);

        const date = new Date(post.date);
        const formattedDate = format(date, "LLLL do, yyyy");
        const year = format(date, "yyyy");

        return {
            id: post.id,
            title: decode(post.title.rendered),
            href: post.acf.url ? post.acf.url : post.link,
            subtitle: `${formattedDate}`,
            excerpt,
            featuredMedia: post.featured_media,
            links: [
                {
                    label: "Read the press release",
                    href: post.acf.url ? post.acf.url : post.link,
                },
            ],
            year,
        };
    });
}

export function getFilters(items: PressReleaseData[]): ListFilter[] {
    return [
        {
            name: "year",
            items: items
                .map((item) => item.year)
                .filter((value, index, self) => self.indexOf(value) === index),
            active: [],
        },
    ];
}

export function getActiveItems(
    items: PressReleaseData[],
    filters: ListFilter[]
): PressReleaseData[] {
    return items.filter((item) => {
        return filters.every(({ name, active }) => {
            if (active.length !== 0 && !active.includes(item[name]))
                return false;
            return true;
        });
    });
}
