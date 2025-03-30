/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'twitdupe.vercel.app',
      'twitdupe-nolen22s-projects.vercel.app',
      'twitdupe-q4um8purc-nolen22s-projects.vercel.app',
      'api.dicebear.com'
    ],
  },
  output: 'standalone',
  poweredByHeader: false,
  distDir: '.next',
  generateEtags: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig; 