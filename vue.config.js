module.exports = {
  chainWebpack: config => {
    config.externals({
      ...config.externals
      // eventemitter3: 'eventemitter3',
      // 'oidc-client': 'oidc-client'
    });
  }
};
