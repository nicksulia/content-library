var webpack = require('webpack');

module.exports = {
    entry:[
        'es5-shim',
        './src/main.js'
    ],
    output: {
        path:__dirname,
        filename: 'app/js/main.js'
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
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude:/node_modules/
            }
        ]
    }
};