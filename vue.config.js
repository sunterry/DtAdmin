const path = require('path');

const resolve = dir => path.join(__dirname, dir);

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  baseUrl: '',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: isDevelopment ? 'error' : false,
  css: {
    extract: !isDevelopment,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_lib', resolve('src/lib'));
  },
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://192.168.1.133:927',
        changeOrigin: true,
        pathRewrite: {
          '^/admin': '',
        },
      },
    },
  },
};
