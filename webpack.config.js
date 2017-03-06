'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWP = require('html-webpack-plugin')

module.exports = {
  entry: [
    path.join(__dirname, 'app/index.js')
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWP({
      title: 'challenge',
      template: 'app/index.ejs'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
  }
}
