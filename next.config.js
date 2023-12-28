/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  experimental: {
    serverActions: true,
    swcPlugins: [
      ["@swc-jotai/debug-label", {}],
      ["@swc-jotai/react-refresh", {}],
    ],
  },
    output: 'standalone'
}

module.exports = nextConfig
