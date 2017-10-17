const path = require('path');
const HtmlWP = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader', 'eslint-loader', ],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract('sass-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWP({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
        new ExtractTextPlugin('styles.css'),
    ],
    watchOptions: {
        poll: true,
    },
};