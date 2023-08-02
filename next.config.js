/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
    './i18n.ts'
);

const nextConfig = {
  experimental: {
    serverActions: false,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/he'
  //     },
  //   ];
  // }
};

module.exports = withNextIntl(nextConfig);
