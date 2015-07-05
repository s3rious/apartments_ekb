var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var autoprefixer = require('autoprefixer-core');
var postcssImport = require('postcss-import');
var postcssNested = require('postcss-nested');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {

  entry: [path.resolve(ROOT_PATH, 'src/app.js')],

  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Apartments EKB',
      template: path.resolve(ROOT_PATH, 'src/index.html')
    })
  ],

  postcss: [autoprefixer, postcssNested, postcssImport]

};

if (TARGET === 'build') {

  module.exports = merge(common, {

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: [
              'babel?stage=0',
              'strip-loader?strip[]=console.group,strip[]=console.groupEnd,strip[]=console.log,strip[]=console.warn,strip[]=console.error,strip[]=console.info'
          ],
          include: path.resolve(ROOT_PATH, 'src')
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss')
        }
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin('app', 'app.js'),
      new ExtractTextPlugin('app.css', {
          allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]

  });
}

if (TARGET === 'dev') {

  module.exports = merge(common, {

    entry: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/dev-server'
    ],

    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css', 'postcss']
        },
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel?stage=0'],
          include: path.resolve(ROOT_PATH, 'src')
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],

    devServer: {
      publicPath: 'http://localhost:8080/',
      contentBase: './dist',
      hot: true,
      inline: true,
      lazy: false,
      quiet: false,
      noInfo: false,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      stats: {
        colors: true
      },
      host: '0.0.0.0'
    },

    node: {
      fs: 'empty'
    }

  });
}
