const path = require('path');

module.exports = {
    entry: '/Users/julianporter/WebstormProjects/camera/js/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    mode: 'development'
};