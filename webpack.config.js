const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.mjs',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `idvpn-client.${process.env.NODE_ENV === 'production' ? 'min.' : ''}js`,
    library: 'idvpn',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js|\.mjs$/,
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
    'oidc-client': {
      commonjs: 'oidc-client',
      commonjs2: 'oidc-client',
      amd: 'oidc-client',
      root: 'Oidc'
    }
  }
};
