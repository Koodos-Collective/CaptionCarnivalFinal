module.exports = {
    images: {
        domains: ['google.com', 'media.giphy.com', 'cdn.glitch.com'],
    },
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };

        return config;
    },
};
