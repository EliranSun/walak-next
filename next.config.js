/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
    './i18n.ts'
);

const nextConfig = withNextIntl({
  experimental: {
    serverActions: false,
  },
});

module.exports = nextConfig;
