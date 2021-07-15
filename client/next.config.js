const withPWA = require('next-pwa')

const runtimeCaching = require('next-pwa/cache')

//const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins')

//const withSourceMaps = require('@zeit/next-source-maps')

const config = {

    generateEtags: false,

    async redirects() {
        return []
    },

    async rewrites() {
        return [

            { source: '/uslugi', destination: '/services'},

        ]
    },

    pwa: {
        dest: 'public',
        runtimeCaching,
        disable: process.env.NODE_ENV === 'development',
        mode: 'production' // disable logging noise
    },

    target: 'serverless',

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

        return config
    },
}


const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withPWA(config))
