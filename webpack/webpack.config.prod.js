const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./base');
const CopyWebpackPlugin = require('copy-webpack-plugin');

webpackConfig.entry = './src';
webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  output: {
    comments: false
  },
  compress: {
    warnings: false
  }
}),
new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, '../', 'sw.js'),
    to: path.resolve(__dirname, '../', 'dist/sw.js')
  }
])
);

module.exports = webpackConfig;
