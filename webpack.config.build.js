var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoprefixer = require('autoprefixer-core');
var postcssImport = require('postcss-import');
var postcssNested = require('postcss-nested');

module.exports = {

  devtool: 'eval',

  entry: {
    app: [
      './src/index.js'
    ]
  },
  output: {
    path: './dist/',
    filename: 'app.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?stage=0!strip-loader?strip[]=console.group,strip[]=console.groupEnd,strip[]=console.log,strip[]=console.warn,strip[]=console.error,strip[]=console.info',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  },

  postcss: [autoprefixer, postcssNested, postcssImport],

  plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.CommonsChunkPlugin('app', 'app.js'),
      new ExtractTextPlugin('app.css', {
          allChunks: true
      })
  ],

  node: {
    fs: 'empty'
  }
};
