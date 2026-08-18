import type { NextConfig } from "next";

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
};

export default nextConfig;
