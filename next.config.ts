import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  allowedDevOrigins: ['terminal.local'],
  trailingSlash: true,
  reactStrictMode: true,
  compiler: { styledComponents: true },
  images: { unoptimized: true },
}

export default config
