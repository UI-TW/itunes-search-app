const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./base');

webpackConfig.entry = './src';
webpackConfig.output = {
  path: path.resolve(__dirname, '../', 'dist/'),
  filename: 'bundle.js'
};
webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      warnings: false
    }
  }));

module.exports = webpackConfig;
