const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FilterEntryOutputPlugin = require('filter-entry-output-plugin')
const { resolve, join } = require('path')

const path = {
  src: resolve(__dirname, 'src'),
  dist: resolve(__dirname, 'static', 'assets')
}

module.exports = ({ production = false } = {}) => ({
  entry: {
    /* JS */
    'main-bundle': join(path.src, 'js', 'main.js'),
    'infinite-scrolling': join(path.src, 'js', 'infinite-scrolling.js'),
    'form-handler': join(path.src, 'js', 'form-handler.js'),
    /* CSS */
    'style': join(path.src, 'scss', 'main.scss')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FilterEntryOutputPlugin(),
    new MiniCssExtractPlugin()
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
    }, {
      test: /\.(c|sc|sa)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  mode: production ? 'production' : 'development',
  devtool: production ? false : 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.dist
  }
})
