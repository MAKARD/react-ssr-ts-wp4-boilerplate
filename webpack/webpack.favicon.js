const path = require("path");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const favicon = path.resolve("./templates/favicon.svg");

module.exports = {
    entry: "./crutch.js",
    output: {
        path: path.resolve("./favicons"),
        publicPath: "/static/",
    },
    plugins: [
        new FaviconsWebpackPlugin({
            prefix: "icons/",
            logo: favicon,
            inject: false,
            emitStats: true,
            persistentCache: true,
            statsFilename: "favicon-stats.json",
            icons: {
                coast: false,
                yandex: true,
                windows: true,
                android: true,
                firefox: true,
                favicons: true,
                twitter: false,
                appleIcon: true,
                opengraph: false,
                appleStartup: false
            }
        })
    ]
}
