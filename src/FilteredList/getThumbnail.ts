export default async function getThumbnail(mediaId: number | string) {
  const response = await fetch(
    encodeURI(`https://ccrt.co/wp-json/wp/v2/media/${mediaId}`)
  );
  const data = await response.json();
  return {
    src: data.media_details.sizes.thumbnail.source_url as string,
    alt: data.alt_text as string,
    width: "150px",
    height: "150px",
  };
}
