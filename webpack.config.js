module.exports = {
    entry: './js/index.js',
    output: {
        path: __dirname,
        filename: 'build/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        modulesDirectories: [
            'node_modules',
            'js',
            'css'
        ]
    }
};
