const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

let plugins;
if (isProduction) {
    plugins = [
        new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
        new UglifyJsPlugin({
            compress: {
                sequences: false
            },
            output: {
                semicolons: false
            },
            sourceMap: false
        }),
        new CopyWebpackPlugin([{
            from: 'client-src/index.html',
            to: './',
            flatten: true
        }])
    ]
} else {
    plugins = [
        new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
        new CopyWebpackPlugin([{
            from: 'client-src/index.html',
            to: './',
            flatten: true
        }])
    ]
}

module.exports = {
    entry: path.resolve(__dirname, './client-src/init.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/assets/",
        filename: 'bundle.js'
    },
    devtool: isProduction ? 'none' : 'source-map',
    devServer: {
        port: 8090,
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: /(node_modules|idea|bower_components)/,
                loaders: ['eslint-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|idea|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, './client-src/components/')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                        },
                    },
                        { loader: 'resolve-url-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }],
                }),
            },
            {
                test: /\.svg$/,
                use: 'svg-url-loader'
            }
        ]
    },
    plugins: plugins
};
