const day = 60 * 60 * 24;
const longCache = [{ key: "Cache-Control", value: `public, max-age=${day * 30}, stale-while-revalidate=${day * 7}` }];

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: day * 30,
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async headers() {
    return [
      { source: "/scene/:path*", headers: longCache },
      { source: "/icons/:path*", headers: longCache },
      { source: "/team/:path*", headers: longCache },
      { source: "/apple-touch-icon.png", headers: longCache },
    ];
  },
};
