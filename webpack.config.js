const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `idvpn-client.${process.env.NODE_ENV === 'production' ? 'min.' : ''}js`,
    library: 'idvpn',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|web_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    },
    'oidc-client': {
      commonjs: 'oidc-client',
      commonjs2: 'oidc-client',
      amd: 'oidc-client',
      root: 'Oidc'
    }
  }
};
