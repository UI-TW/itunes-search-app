const webpack = require('webpack');
const webpackConfig = require('./base');

webpackConfig.entry = './src';
webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
  output: {
    comments: false
  },
  compress: {
    warnings: false
  }
})
);

module.exports = webpackConfig;
