/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/", // The incoming request path
        destination: "/home", // The path to redirect to
        permanent: true, // Use 308 (permanent) or 307 (temporary) status code
      },
      // You can add more redirects here
    ];
  },

  images: {
    // Add the external hostname(s) here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "tailwindcss.com",
      },
    ],
  },
};

export default nextConfig;
