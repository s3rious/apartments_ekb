module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: './dist/',
    filename: 'parser.js'
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          stage: 0
        }
      }
    ]
  },
  devServer: {
    contentBase: './dist/'
  },
  node: {
    fs: "empty"
  }
};
