/** @type {import('next').NextConfig} */

const { api_host, api_limit, images_protocol, images_hostname, images_port } =
  process.env;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  publicRuntimeConfig: {
    env: {
      host: api_host,
      limit: api_limit,
      images_protocol,
      images_hostname,
      images_port,
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: images_protocol,
        hostname: images_hostname,
        port: images_port || "",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
