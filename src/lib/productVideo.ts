/**
 * The agent walkthrough shown in the product section. Re-cutting the video means
 * changing these two values and replacing the poster file in `public/`.
 */
export const PRODUCT_VIDEO_ID = "TMdQ1amI6m0";

/** Served from this site so the page asks YouTube for nothing until play is pressed. */
export const PRODUCT_VIDEO_POSTER = "/como-funciona-agentes.jpg";

/**
 * Player URL for the click-to-play embed. The no-cookie host sets no YouTube
 * cookies before playback. Autoplay is safe because the iframe only exists after
 * the visitor pressed play; `rel=0` keeps the end-of-video suggestions to this
 * channel; `playsinline` stops iOS from forcing fullscreen.
 */
export function youtubeEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({ autoplay: "1", rel: "0", playsinline: "1" });
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params}`;
}
