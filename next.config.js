/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
    './i18n.ts'
);

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'firebasestorage.googleapis.com',
      'cdn.discordapp.com',
      'f7lpfsjxmvjp0zkr.public.blob.vercel-storage.com'
    ],
  },
};

module.exports = withNextIntl(nextConfig);
