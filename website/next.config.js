// const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === "production";
const withPreact = require("next-plugin-preact");

module.exports = withPreact({
    distDir: "build",
    trailingSlash: true,
    images: {
        domains: ["i.imgur.com"],
    },
    experimental: {
        modern: true,
    },
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };

        return config;
    },
    async headers() {
        return [
            {
                // headers matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value:
                            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
            {
                source: "/icons/(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31556952, immutable",
                    },
                ],
            },
            {
                source: "/fonts/(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31556952, immutable",
                    },
                ],
            },
            {
                source: "/images/(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31556952, immutable",
                    },
                ],
            },
        ];
    },
});
