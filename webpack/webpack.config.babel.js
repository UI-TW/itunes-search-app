const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./base');
const workboxPlugin = require('workbox-webpack-plugin');

webpackConfig.entry = './src';
webpackConfig.output = {
  path: path.resolve(__dirname, '../', 'dist/'),
  filename: 'bundle.js'
};
webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  output: {
    comments: false
  },
  compress: {
    warnings: false
  }
}),
new workboxPlugin({
  globDirectory: 'dist',
  globPatterns: ['**/*.{html,js}'],
  swDest: path.join('dist', 'sw.js'),
  clientsClaim: true,
  skipWaiting: true,
}));

module.exports = webpackConfig;
