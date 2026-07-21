/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  output: "standalone",

  // PostHog rewrites
  async rewrites() {
    return [
      // Archive: serve old conference sites from public/ folder
      {
        source: "/2018",
        destination: "/2018/index.html",
      },
      {
        source: "/2019",
        destination: "/2019/index.html",
      },
      {
        source: "/2020",
        destination: "/2020/index.html",
      },
      {
        source: "/2021",
        destination: "/2021/index.html",
      },
      {
        source: "/2024",
        destination: "/2024/index.html",
      },
      // PostHog rewrites
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://eu.i.posthog.com/decide",
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
