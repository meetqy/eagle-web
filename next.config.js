/** @type {import('next').NextConfig} */

const { api_host, api_limit, images_protocol, images_hostname } = process.env;

console.log({
  protocol: images_protocol,
  hostname: images_hostname,
});

// if (process.env.NODE_ENV === "development") {
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// }

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  publicRuntimeConfig: {
    api: {
      host: api_host,
      limit: api_limit,
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: images_protocol,
        hostname: images_hostname,
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
