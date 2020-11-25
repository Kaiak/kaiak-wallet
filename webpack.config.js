const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/js/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "index.html", to: "index.html" },
                { from: "src/tmpl", to: "src/tmpl" },
                { from: "src/css", to: "css" },
            ],
            options: {
                concurrency: 100,
            },
        }),
    ],
};
