/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Cabeçalhos de segurança ficam em public/_headers (Cloudflare Pages), pois headers() não roda em static export.
}

export default nextConfig
