module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    externals: {
      'oidc-client': {
        commonjs: 'oidc-client',
        commonjs2: 'oidc-client',
        amd: 'oidc-client',
        root: 'Oidc'
      }
    }
  }
};
