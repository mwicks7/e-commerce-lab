/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/categories/planets',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig