const path = require('path');
const htmlWP = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve('dist'),
        filename: 'dist/[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader', 'eslint-loader', ],
                exclude: /node_modules/,
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
    },
};