const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./base');

webpackConfig.module.rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    'react-hot-loader/webpack',
    'babel-loader'
  ]
},
{
  test: /\.tpl\.html$/,
  loader: 'handlebars-loader'
});

module.exports = Object.assign({}, webpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src'
  ],
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, '../', 'dist/'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    port: 3000,
    hot: true,
    compress: false,
    historyApiFallback: true,
    stats: {
      colors: true,
      timings: true,
      version: true,
      warnings: true
    }
  },
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
   }
  }
});
