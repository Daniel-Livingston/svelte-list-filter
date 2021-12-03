export default async function getThumbnail(mediaId: number | string) {
  const response = await fetch(
    encodeURI(`https://ccrt.co/wp-json/wp/v2/media/${mediaId}`)
  );
  const data = await response.json();
  return {
    src: data.media_details.sizes["et-pb-post-main-image"].source_url as string,
    alt: data.alt_text as string,
    width: "400px",
    height: "250px",
  };
}
