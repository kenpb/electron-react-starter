const resolve = require('path').resolve
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/app/index.jsx',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },

    // keeping this for backwards compatibility with the `run react command`
    devServer: {
        contentBase: 'dist',
        port: 40305
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
        ]
    },

    plugins: [
        new ExtractTextPlugin('styles.css')
    ]
}

