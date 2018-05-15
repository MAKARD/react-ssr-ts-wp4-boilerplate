const path = requrie("path");
const Webpack = require("webpack");

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = requrie("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const meta = require("../meta.json");
const commonConfig = require("./webpack.common");
const debug = process.env.NODE_ENV !== "production";

const sourceMapOptions = {
    sourceMap: debug
};

module.exports = {
    ...commonConfig,
    devServer: {
        publicPath: "/",
        contentBase: path.resolve('./web'),
        noInfo: false,
        hot: true,
        inline: true,
        open: false,
        historyApiFallback: true,
        port: 8089
    },
    entry: [
        path.resolve("./src/index.tsx")
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: {
                        loader: "style-loader",
                        options: sourceMapOptions
                    },
                    use: [
                        {
                            loader: "css-loader",
                            options: sourceMapOptions
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: () => {
                                    const plugins = [require("autoprefixer")()];
                                    !debug && plugins.push(require("cssnano")());
                                    return plugins;
                                },
                                ...sourceMapOptions
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: [
                                    path.resolve("./styles"),
                                    path.resolve("./node_modules/compass-mixins/lib"),
                                ],
                                ...sourceMapOptions
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: `styles.v${packageJson.version}.css`,
            publicPath: "/static/"
        }),
        new CleanWebpackPlugin([path.resolve("./web")], {
            root: path.resolve(".")
        }),
        debug
            ? new UglifyJSPlugin({
                parallel: true,
                test: /main\..*\.js/g
            })
            : new Webpack.HotModuleReplacementPlugin()
    ]
};
