const { withCloudflare } = require("@cloudflare/next-on-pages");

/** @type {import('next').NextConfig} */
module.exports = withCloudflare({
  reactStrictMode: false,
  images: {
    unoptimized: true
  }
});
