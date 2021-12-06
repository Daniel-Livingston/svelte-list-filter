<script lang="ts">
  import trimStart from "lodash/trimStart";
  import trimEnd from "lodash/trimEnd";
  import truncate from "lodash/truncate";
  import { format, isFuture, isAfter } from "date-fns";
  import { decode } from "html-entities";

  import FilteredList from "./FilteredList/index.svelte";
  import type { ListItemType } from "./FilteredList/index.svelte";

  interface EventItemType extends ListItemType {
    startDate: Date;
    endDate: Date;
    year: string;
  }

  export const apiUrl = encodeURI(
    "https://ccrt.co/wp-json/wp/v2/posts?categories=62&per_page=100"
  );

  function getListItems(data: any): {
    upcoming: EventItemType[];
    past: EventItemType[];
  } {
    let upcoming: EventItemType[] = [];
    let past: EventItemType[] = [];

    data.forEach((post: any) => {
      let excerpt: string = trimStart(post.excerpt.rendered, "<p>");
      excerpt = trimEnd(excerpt, "</p>\n");
      excerpt = truncate(excerpt, { length: 250 });
      excerpt = decode(excerpt);

      const startDate = post.acf.schedule.start
        ? new Date(post.acf.schedule.start)
        : undefined;
      const endDate = post.acf.schedule.end
        ? new Date(post.acf.schedule.end)
        : undefined;

      const item = {
        id: post.id,
        title: decode(post.title.rendered),
        href: post.acf.url ? post.acf.url : post.link,

        startDate,
        endDate,
        subtitle: post.acf.location,
        excerpt,
        mediaId: post.featured_media,
        month: format(startDate, "MMM"),
        day: format(startDate, "d"),
        fullDate: getFullDateTime(startDate, endDate),
        year: format(startDate, "yyyy"),
      };

      if (isFuture(startDate)) upcoming.push(item);
      else past.push(item);
    });

    return { upcoming, past };
  }

  function getFullDateTime(start?: Date, end?: Date): string {
    if (!start) return "";
    const formattedStartDate = format(start, "LLL do, yyyy");
    const formattedStartTime = format(start, "h:mm a");
    const formattedStart =
      formattedStartTime === "12:00 AM"
        ? formattedStartDate
        : `${formattedStartDate} ${formattedStartTime}`;

    if (!end) return formattedStart;

    const formattedEndDate = format(end, "LLL do, yyyy");
    const formattedEndTime = format(end, "h:mm a");

    if (formattedEndDate === formattedStartDate) {
      if (formattedEndTime === "12:00 AM") return formattedStart;
      return `${formattedStart} - ${formattedEndTime}`;
    }

    if (formattedEndTime === "12:00 AM")
      return `${formattedStart} - ${formattedEndDate}`;
    return `${formattedStart} - ${formattedEndDate} ${formattedEndTime}`;
  }

  let promise = fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const { upcoming, past } = getListItems(data);
      upcoming.sort(
        (
          { startDate: firstStartDate, endDate: firstEndDate },
          { startDate: secondStartDate, endDate: secondEndDate }
        ) => {
          if (isAfter(firstStartDate, secondStartDate)) return 1;
          else if (isAfter(secondStartDate, firstStartDate)) return -1;
          else {
            if (isAfter(firstEndDate, secondEndDate)) return 1;
            else return -1;
          }
        }
      );

      past.sort(
        (
          { startDate: firstStartDate, endDate: firstEndDate },
          { startDate: secondStartDate, endDate: secondEndDate }
        ) => {
          if (isAfter(firstStartDate, secondStartDate)) return -1;
          else if (isAfter(secondStartDate, firstStartDate)) return 1;
          else {
            if (isAfter(firstEndDate, secondEndDate)) return -1;
            else return 1;
          }
        }
      );

      return {
        upcoming,
        past,
      };
    });
</script>

{#await promise then data}
  {#if data.upcoming.length > 0}
    <h2>Upcoming Events</h2>
    <FilteredList items={data.upcoming} />
  {/if}

  {#if data.past.length > 0}
    <h2 style={data.upcoming.length > 0 && "margin-top:3rem"}>Past Events</h2>
    <FilteredList items={data.past} />
  {/if}
{/await}

<style>
  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
</style>
