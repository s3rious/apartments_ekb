var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer-core');
var postcssImport = require('postcss-import');
var postcssNested = require('postcss-nested');

module.exports = {

  devtool: 'eval',

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  output: {
    path: './dist/',
    filename: 'app.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?stage=0'],
        include: path.join(__dirname, 'src')
      },
      {
        test:   /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'file-loader'
      }
    ]
  },

  postcss: [autoprefixer, postcssNested, postcssImport],

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
};
