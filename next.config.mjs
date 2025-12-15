/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/((?!waitlist|_next|favicon\\.ico|icon.*|manifest.*|robots.*|sitemap.*|.*\\..*).*)",
        destination: "/waitlist",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
