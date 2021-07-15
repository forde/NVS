module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_URL,
    exclude: [
        '/secret*',
    ],
    transform: async (config, path) => {

        const rewrites = [
            { source: '/uslugi', destination: '/services' },
        ]

        const rewrite = path => {
            return rewrites.reduce((acc, r) => {
                return ~acc.indexOf(r.destination) ? acc.replace(r.destination, r.source) : acc
            }, path)
        }

        //console.log(path,'=>',rewrite(path));

        return {
            loc: rewrite(path), // => this will be exported as http(s)://<config.siteUrl>/<path>
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
    },
}