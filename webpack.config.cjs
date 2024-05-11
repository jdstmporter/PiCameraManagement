const path = require('path');
const CWP = require('copy-webpack-plugin');

module.exports = {
    entry: '/Users/julianporter/Developer/Webstorm/camera/js/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new CWP({
            patterns: [{
                from: './static',
                to: '.'
        }, {
                from: './less',
                to: '.',
                filter: (path => /\.css$/.test(path))
            }]
        })
    ],
    mode: 'development'
};