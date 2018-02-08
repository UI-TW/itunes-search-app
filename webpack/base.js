const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  output: {
    publicPath: './',
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
    new htmlWebpackPlugin({
      inject: true,
      filename: path.resolve(__dirname, '../dist', 'index.html'),
      template: path.resolve(__dirname, '../src', 'index.html')
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../', 'src/images'),
        to: path.resolve(__dirname, '../', 'dist/images')
      },
      /*  START: {Adding Manifest file} {2} out of {2} */
      {
        from: path.resolve(__dirname, '../', 'src/manifest.json'),
        to: path.resolve(__dirname, '../', 'dist')
      },
       /*  END: {Adding Manifest file} {2} out of {2} */
      {
        from: path.resolve(__dirname, '../', 'node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.2.js'),
        to: path.resolve(__dirname, '../', 'dist/')
      }
    ])

  ]
};
