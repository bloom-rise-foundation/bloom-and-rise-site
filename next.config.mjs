const day = 60 * 60 * 24;
const longCache = [{ key: "Cache-Control", value: `public, max-age=${day * 30}, stale-while-revalidate=${day * 7}` }];

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // the stylesheet is small (about 15KB gzipped): inline it so first paint never waits on a second request
  experimental: { inlineCss: true },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: day * 30,
  },
  async headers() {
    return [
      { source: "/icons/:path*", headers: longCache },
      // only the portrait files: "/team/:path*" also matched the /team and /team/heads PAGES, so browsers kept them for 30 days
      { source: "/team/:file([^/]+\\.(?:jpg|jpeg|png|webp|avif))", headers: longCache },
      { source: "/apple-touch-icon.png", headers: longCache },
    ];
  },
};
