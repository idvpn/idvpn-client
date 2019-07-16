module.exports = {
  chainWebpack: config => {
    config.externals({
      // eventemitter3: 'eventemitter3',
      'oidc-client': 'Oidc',
      vue: 'Vue'
    });
  }
};
