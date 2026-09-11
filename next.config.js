/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  allowedDevOrigins: ['terminal.local'],
  trailingSlash: true,
  reactStrictMode: true,
  compiler: { styledComponents: true },
  images: { unoptimized: true },
}
