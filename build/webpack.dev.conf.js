const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OptimizeJsPlugin = require('optimize-js-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { setErrorMsg } = require('./ts-error-hint-plugin')

const utils = require('./utils/utils')
const config = require('../config/')
const env = require('../config/conf.env')
const baseWebpackConfig = require('./webpack.base.conf')

const friendlyErrorsPlugin = new FriendlyErrorsPlugin()

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/utils/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader', options: { sourceMap: config.dev.cssSourceMap, importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          { loader: 'css-loader', options: { sourceMap: config.dev.cssSourceMap, importLoaders: 1 } },
          'postcss-loader',
          { loader: 'stylus-loader', options: { sourceMap: config.dev.cssSourceMap } }
        ]
      }
    ]
  },

  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',

  plugins: [
    new webpack.SourceMapDevToolPlugin(),

    new webpack.DefinePlugin(Object.assign({
      'process.env': env
    }, env)),

    new OptimizeJsPlugin({
      sourceMap: true
    }),

    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.base.template,
      inject: config.base.inject
    }),

    friendlyErrorsPlugin,

    new ForkTsCheckerWebpackPlugin({
      tsconfig: resolve('tsconfig.json'),
      logger: {
        error (error) {
          friendlyErrorsPlugin.displayErrors([new Error(error)], 'error')
          setTimeout(() => {
            setErrorMsg(error, 'error')
          }, 1000)
        },
        warn: function (msg) {
          console.warn(msg)
        },
        info: function (msg) {
          console.info(msg)
          setErrorMsg('', 'info')
        }
      }
    })
  ]
})

function resolve (filename) {
  return path.resolve(__dirname, '../' + filename)
}
