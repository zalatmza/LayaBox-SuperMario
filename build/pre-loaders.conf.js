const ecoDev = process.argv.includes('--eco-mode')

if (ecoDev) {
  console.log(`
    [EcoMode] 进入 EcoMode！
    ===
    专为低配笔记本设计，节省您的电池电量！
    在外加班也不会电量血崩，腰不酸腿部疼一加就是十小时！

    注：第一次生成 Cache 时会耗时较久，请耐心等待.
  `)
}

module.exports = ecoDev
  ? ['cache-loader']
  : ['cache-loader', 'thread-loader']
