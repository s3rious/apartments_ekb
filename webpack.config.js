module.exports = {
  context: __dirname,
  entry: './src/parser.js',
  output: {
    path: './dist/',
    filename: 'parser.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
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
