/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.sanity.io"], // Add the domain of your images here
  },
};

module.exports = nextConfig;
