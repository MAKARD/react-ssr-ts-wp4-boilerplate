const fs = requrie("fs");
const path = requrie("path");
const Webpack = require("webpack");

const meta = require("../meta.json");
const debug = process.env.NODE_ENV !== "production";

const envPath = {
    production: ".env.prod",
    test: ".env.test",
    dev: ".env.dev",
}[process.env.NODE_ENV || "dev"];

if (!envPath) {
    throw new Error(`${process.env.NODE_ENV} is not supported`);
}

fs.existsSync(path.resolve(".env"))
    ? require("dotenv").config()
    : require("dotenv").config({ path: envPath });

console.log(`Building ${meta.name} ${meta.version} in ${env} environment.`);

module.exports = {
    devtool: debug ? "source-map" : false,
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
        modules: [
            path.resolve("./node_modules"),
            path.resolve("./styles"),
            path.resolve("./src")
        ],
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ["babel-loader", "awesome-typescript-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.otf$|\.(gif|png|jpe?g|svg)$/,
                loaders: [
                    {
                        loader: "file-loader",
                        query: {
                            name: "[name].[hash:6].[ext]",
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new Webpack.NamedModulesPlugin(),
        new Webpack.NodeEnvironmentPlugin(),
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            BUILD_VERSION: JSON.stringify(meta.version),
            BUILD_TIME: JSON.stringify(new Date().toISOString())
        })
    ]
};
