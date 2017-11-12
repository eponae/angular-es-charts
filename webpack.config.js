const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/scripts/app.js'),
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /MaterialIcons-Regular(\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?))/,
        loader: 'file-loader?name=[name].[ext]&outputPath=/fonts/'
      },
      {
        test: /instruments_musique_.*(\.(jpe?g|png|gif|svg)$)/i,
        loader: 'file-loader?name=[name].[ext]&outputPath=/img/'
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        loader: 'html-loader',
        options: {
          minimize: true,
          removeComments: false,
          collapseWhitespace: true
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new SassLintPlugin({
      configFile: '.sass-lint.yml',
      glob: 'src/**/*.scss',
      quiet: false,
      failOnWarning: false,
      failOnError: true,
      testing: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].bundle.css',
      allChunks: true
    }),
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
      exclude: '/node_modules/',
      uglifyOptions: {
        ecma: 8
      }
    })
  ],
  devServer: {
    setup: (app) => {
      app.get('/env', (req, res) => {
        res.json({
          GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY
        });
      });
    }
  }
};
