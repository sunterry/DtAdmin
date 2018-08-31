const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: '',
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV !== 'production' ? 'error' : false,
  css: {
    extract: process.env.NODE_ENV === 'production',
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@components', resolve('src/components'))
      .set('@config', resolve('src/config'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@filter', resolve('src/filter'))
      .set('@directive', resolve('src/directive'))
      .set('@http', resolve('src/http'))
      .set('@store', resolve('src/store'))
      .set('@router', resolve('src/router'))
      .set('@utils', resolve('src/utils'))
  },
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://192.168.1.133:927',
        changeOrigin: true,
        pathRewrite: {
          '^/admin': ''
        }
      }
    }
  }
}
