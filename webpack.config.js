const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
