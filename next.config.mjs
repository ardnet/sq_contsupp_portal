/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a fully static site into ./out (served by Render as a Static Site).
  output: "export",
  // Emit /partners/1/index.html instead of /partners/1.html so clean URLs
  // work on any static host without rewrite rules.
  trailingSlash: true,
  // The Next.js image optimizer needs a server; serve images as-is.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
