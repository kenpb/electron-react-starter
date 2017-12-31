const resolve = require('path').resolve

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' }, 
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ],
            },
        ]
    }

}
