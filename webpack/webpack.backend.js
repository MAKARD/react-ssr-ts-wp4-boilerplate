const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");

const commonConfig = require("./webpack.common");

module.exports = {
    ...commonConfig,
    entry: ["@babel/polyfill", path.resolve("./src/server/index.tsx")],
    output: {
        path: path.resolve("./build"),
        libraryTarget: "commonjs",
        publicPath: "/static/",
        filename: "server.js"
    },
    externals: ["express"],
    target: "node",
    module: {
        rules: [
            ...commonConfig.module.rules,
            {
                test: /\.(gif|png|jpe?g|svg|css)$/i,
                loader: 'file-loader',
                query: {
                    name: "[name].[hash:6].[ext]",
                    emitFile: false,
                }
            }
        ]
    },
    plugins: [
        ...commonConfig.plugins,
        new CleanWebpackPlugin([path.resolve("./build")], {
            root: path.resolve(".")
        })
    ]
};
