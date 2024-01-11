/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
    './i18n.ts'
);

const nextConfig = {
  experimental: {
    serverActions: false,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'firebasestorage.googleapis.com',
      'cdn.discordapp.com'
    ],
  },
};

module.exports = withNextIntl(nextConfig);
