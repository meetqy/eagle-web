/** @type {import('next').NextConfig} */

const {
  api_host,
  api_limit,
  images_protocol,
  images_port,
  images_pathname,
  images_hostname,
} = process.env;

const nextConfig = {
  reactStrictMode: true,
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
        port: images_port,
        pathname: images_pathname,
      },
    ],
  },
};

module.exports = nextConfig;
