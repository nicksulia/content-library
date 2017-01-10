module.exports = {
    entry:[
        './src/main.js'
    ],
    output: {
        path:__dirname,
        filename: 'app/js/main.js'
    },
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