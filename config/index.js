/**
 * 项目构建配置.
 * 基于 Vue Webpack 模板构建.
 *
 * 查看 http://vuejs-templates.github.io/webpack 获取更多信息.
 */
const path = require('path')

const base = {
  // 项目入口文件.
  app: rootResolve('src/index.ts'),

  // 项目入口模板路径.
  template: rootResolve('src/index.jade'),

  // 设置 HtmlWebpackPlugin 是否使用 inject 模式注入 CSS 与 Script.
  // 当为 true 时，将自动将 CSS 与 HTML 插入至打包出的 HTML 中.
  // 当为 false 时，将在模板中按照模板预先定义位置插入.
  inject: false
}

const dev = {
  port: 8080,
  autoOpenBrowser: false,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',

  // CSS Sourcemaps 默认关闭.
  // 可能存在潜在问题, 详见 https://github.com/webpack/css-loader#sourcemaps
  cssSourceMap: false
}

const build = {
  index: path.resolve(__dirname, '../dist/index.html'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  productionSourceMap: false,  // 线上默认关闭 JS Sourcemaps.

  // Gzip 默认关闭.
  // 在使用之前需要安装 npm install --save-dev compression-webpack-plugin
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],

  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report
}

module.exports = {
  base,
  dev,
  build
}

function rootResolve (filePath) {
  return path.resolve(__dirname, '../' + filePath)
}
