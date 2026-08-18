import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // quality={90} on the product screenshots is otherwise ignored and falls
    // back to 75, which shows as softness on an already low-resolution capture
    qualities: [75, 90],
  },
};

export default nextConfig;
