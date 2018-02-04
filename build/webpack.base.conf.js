const path = require('path')
const webpack = require('webpack')
const utils = require('./utils/utils')
const config = require('../config/')
const preLoaders = require('./pre-loaders.conf')
const ecoDev = process.argv.includes('--eco-mode')
const srcFolders = ['src'].map(resolve)

module.exports = {
  cache: true,

  entry: {
    app: config.base.app,
  },

  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: config.dev.assetsPublicPath
  },

  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@': resolve('src'),
      'src': resolve('src')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: srcFolders
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        enforce: 'pre',
        exclude: [
          /node_modules/
        ],
        options: require('./tslint.conf')
      },
      {
        test: /\.js$/,
        use: preLoaders.concat([
          'babel-loader'
        ]),
        include: srcFolders
      },
      {
        test: /\.tsx?$/,
        use: preLoaders.concat([
          'babel-loader',
          {
            loader: 'ts-loader',
            options: { happyPackMode: !ecoDev }
          }
        ]),
        include: srcFolders
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 5120,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /zh-cn/
    )
  ]
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
