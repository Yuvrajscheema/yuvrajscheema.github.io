/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Static export for GitHub Pages — `npm run build` writes plain HTML to out/.
  // Server-only features (headers(), redirects, image optimization, compress)
  // do NOT work here; do not add them.
  output: 'export',

  // Pages export as directories (out/<slug>/index.html) so GitHub Pages serves
  // /untitled_spacecraft/ style URLs directly.
  trailingSlash: true,

  // Required for `output: 'export'` — images are served exactly as committed,
  // so compress them before adding to public/ (target < 200 KB, see PROJECT_GUIDE.md).
  images: {
    unoptimized: true,
  },

  compiler: {
    // Strip console.* from production bundles
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  poweredByHeader: false,
};

module.exports = nextConfig;
