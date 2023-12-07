/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
    './i18n.ts'
);

const nextConfig = {
    experimental: {
        serverActions: false,
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/chapter*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,POST" },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
                    },
                ]
            }
        ]
    }
};

module.exports = withNextIntl(nextConfig);
