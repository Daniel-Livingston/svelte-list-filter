import trimStart from "lodash/trimStart";
import trimEnd from "lodash/trimEnd";
import truncate from "lodash/truncate";
import { decode } from "html-entities";
import type { JobOpeningData, ListFilter } from "./types";

export const apiUrl = encodeURI(
  "https://ccrt.co/wp-json/wp/v2/posts?categories=31&per_page=100&orderby=title&order=asc"
);

export function dataHandler(data: any): JobOpeningData[] {
  return data.map((post: any) => {
    let excerpt: string = trimStart(post.excerpt.rendered, "<p>");
    excerpt = trimEnd(excerpt, "</p>\n");
    excerpt = truncate(excerpt, { length: 250 });
    excerpt = decode(excerpt);

    return {
      id: post.acf.job_id,
      title: decode(post.title.rendered),
      smallTitle: post.acf.job_id,
      href: post.link,
      subtitle: `${post.acf.job_region} | ${post.acf.job_department} | ${post.acf.job_location}`,
      excerpt,
      links: [{ label: "See details", href: post.link }],
      department: post.acf.job_department,
      location: post.acf.job_location,
      region: post.acf.job_region,
    };
  });
}

export function getFilters(items: JobOpeningData[]): ListFilter[] {
  return ["region", "department"].map((name) => {
    return {
      name,
      items: items
        .map((item) => item[name])
        .filter((value, index, self) => self.indexOf(value) === index),
      active: [],
    };
  });
}

export function getActiveItems(
  items: JobOpeningData[],
  filters: ListFilter[]
): JobOpeningData[] {
  return items.filter((item) => {
    return filters.every(({ name, active }) => {
      if (active.length !== 0 && !active.includes(item[name])) return false;
      return true;
    });
  });
}
