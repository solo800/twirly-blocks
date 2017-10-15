const path = require('path');
const htmlWP = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlWP({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
    ],
    watchOptions: {
        poll: true,
    }
}