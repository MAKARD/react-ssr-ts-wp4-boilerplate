const path = requrie("path");

const CleanWebpackPlugin = requrie("clean-webpack-plugin");

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
    devtool: "source-map",
    target: "node",
    module: {
        rules: [
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
        new CleanWebpackPlugin([path.resolve("./build")], {
            root: path.resolve(".")
        })
    ]
};
