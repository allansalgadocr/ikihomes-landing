import type { NextConfig } from "next";

// The buyer site's deployment origin. Set only in Production, where this app
// owns the apex: it keeps the home, the blog and the legal pages, and proxies
// every other path to the buyer site server side, so shared listing, profile
// and short links open on ikihomescr.com. Unset, this app serves only itself.
const WEB_ORIGIN = process.env.WEB_ORIGIN?.trim().replace(/\/+$/, "") || undefined;

// The buyer site's fixed asset prefix when WEB_BEHIND_APEX_PROXY is on. Its pages reference their
// assets under this path, and the proxy forwards it verbatim.
const WEB_ASSET_PREFIX = "/web-static";

const nextConfig: NextConfig = {
  // Verification builds set NEXT_DIST_DIR so they never clobber the .next
  // directory a running `next dev` depends on -- building into the shared
  // .next while dev runs breaks the dev server (same collision as ikihomes-web).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // quality={90} on the product screenshots is otherwise ignored and falls
    // back to 75, which shows as softness on an already low-resolution capture
    qualities: [75, 90],
  },
  async rewrites() {
    if (!WEB_ORIGIN) return [];
    return {
      // The buyer site's scripts, styles and image optimizer.
      beforeFiles: [
        {
          source: `${WEB_ASSET_PREFIX}/:path*`,
          destination: `${WEB_ORIGIN}${WEB_ASSET_PREFIX}/:path*`,
        },
        // This app's own /sitemap.xml shadows the buyer site's index, so the
        // index is published here instead and listed in robots.txt. Its
        // children live under /sitemaps/, which the fallback already forwards.
        { source: "/sitemap-listings.xml", destination: `${WEB_ORIGIN}/sitemap.xml` },
      ],
      // A root file this app does not have (the buyer site's placeholder,
      // hero image, logos). It needs its own rule because `[lang]` would
      // otherwise claim every single segment path before the fallback runs.
      // Runs after this app's own public files, so those always win.
      afterFiles: [
        {
          source: "/:file([^/]+\\.[A-Za-z0-9]+)",
          destination: `${WEB_ORIGIN}/:file`,
        },
      ],
      // Anything no route of this app matched: properties, search, shares,
      // private views, short links, agent profiles, OG images, route handlers.
      fallback: [{ source: "/:path*", destination: `${WEB_ORIGIN}/:path*` }],
    };
  },
};

export default nextConfig;
