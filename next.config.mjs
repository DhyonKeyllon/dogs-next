/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // "deviceSizes" to change the sizes of the images between the breakpoints
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dogsapi.origamid.dev",
      },
    ],
  },
};

export default nextConfig;
