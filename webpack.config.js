const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    devtool: "source-map",
    resolve: {
        plugins: [
            new TsconfigPathsPlugin({
                /* options: see below */
            }),
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        alias: {
            types: path.resolve(__dirname, "src/types"),
            "@": path.resolve(__dirname, "src"),
        },
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "./index.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(js|ts)x?$/,
                loader: require.resolve("babel-loader"),
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
