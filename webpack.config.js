var path    = require('path');
const webpack = require('webpack'); //to access built-in plugins
var hwp     = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/app/app.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/build')
    },
    module:{
        rules:[{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    },
    plugins:[
        new webpack.ProgressPlugin()
    ]
}