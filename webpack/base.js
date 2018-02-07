const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, '../', 'dist/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.tpl\.html$/,
      loader: 'handlebars-template-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['extracted-loader'].concat(ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {minimize: true}
        },
          {
            loader: 'postcss-loader'
          }
        ]
      }))
    }, {
      test: /\.(woff|woff2|ttf|svg)$/,
      exclude: /node_modules/,
      use: [
        'url-loader?limit=100000'
      ],
    }, {
      test: /\.(eot|png)$/,
      exclude: /node_modules/,
      use: [
        'file-loader'
      ]
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    /* START: {Adding Service Worker} {3} out of {4} */
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../', 'PWA-sw.js'),
        to: path.resolve(__dirname, '../', 'dist')
      }
    ])
    /* END: {Adding Service Worker} {3} out of {4} */
  ]
};
