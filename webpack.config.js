const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/scripts/app.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }]
                }),
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './src/assets/favicon/*', to: 'dist/'},
            {from: './src/assets/img/*', to: 'dist/assets/img/'},
            {from: './node_modules/bootstrap/dist/fonts/*', to: 'dist/assets/fonts/'},
            {from: './src/index.html', to: 'dist/'}
        ]),
        new ExtractTextPlugin({
            filename: 'bundle.css',
            allChunks: true
        })
    ]
};