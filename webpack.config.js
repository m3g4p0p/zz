const CleanWebpackPlugin = require('clean-webpack-plugin')
const { resolve, join } = require('path')

const path = {
  src: resolve(__dirname, 'src', 'js'),
  dist: resolve(__dirname, 'static', 'js')
}

module.exports = ({ production = false } = {}) => ({
  entry: {
    'infinite-scrolling': join(path.src, 'infinite-scrolling.js'),
    'scroll-to-top': join(path.src, 'scroll-to-top.js')
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'standard-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  mode: production ? 'production' : 'development',
  devtool: production ? false : 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.dist
  }
})
