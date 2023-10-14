/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["staging-web.epluscharging.com", "images.ctfassets.net"],
  },
  compiler: {
    removeConsole: true,
  },
  // speed up compiler - https://github.com/vercel/next.js/issues/48748#issuecomment-1590036197
  modularizeImports: {
    "@mui-material": {
      transform: "@mui-material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
};

module.exports = nextConfig;
