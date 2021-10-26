const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require("webpack")
const CopyPlugin = require("copy-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const jQuery = require("jQuery")
const path = require('path');

module.exports = {
    entry: [
        './src/index.js',
        "./src/scss/app.scss",
    ],
    // mode: 'development',

    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: true,
        minimizer: [
          new HtmlMinimizerPlugin(),
          new CssMinimizerPlugin(),
          new TerserPlugin(),
        ],
      },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.ttf$/,
            use: ['file-loader']
        },
           
        ],
           
    },
    plugins: [
        new MonacoWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          })
    ]
};

