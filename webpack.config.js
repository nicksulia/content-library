var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:{
        main:[
        'es5-shim',
        './client/src/main.js'
        ]
    },
    output: {
        path:__dirname,
        filename: 'client/app/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // A common mistake is not stringifying the "production" string.
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('client/app/css/[name].css'),
    ],
};
