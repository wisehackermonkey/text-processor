const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const path = require('path');

module.exports = {
    entry: [
        './src/index.js',
        "./src/scss/app.scss",
    ],
    mode: 'development',

    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
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
        }
           
        ]
    },
    plugins: [
        new MonacoWebpackPlugin()
    ]
};
