const path = require('path');

module.exports = {
    entry: {
        app:path.resolve(__dirname, './src/ce.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].js',
    },
};