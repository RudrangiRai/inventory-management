/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your config options here

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-inventorymanagement003.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;


