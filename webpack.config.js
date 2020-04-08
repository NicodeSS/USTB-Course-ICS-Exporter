const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'course-exporter.js',
        path: path.resolve(__dirname, 'dist')
    }
};