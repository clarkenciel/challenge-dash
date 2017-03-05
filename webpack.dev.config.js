'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWP = require('html-webpack-plugin')

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/index.js')
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWP({
      title: 'challenge',
      template: 'app/index.ejs'
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/i,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },

  devtool: 'source-map'
}
