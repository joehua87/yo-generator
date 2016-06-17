/* eslint-disable no-var */
var webpack = require('webpack')
var path = require('path')
var CarteBlanche = require('carte-blanche')

module.exports = {
  // Add hot reloading in development
  entry: [
    'webpack-hot-middleware/client',
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel',
      exclude: /node_modules/,
      query: { presets: ['react-hmre'] },
    }, {
      test: /\.css$/,
      loader: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=gsrUI__[local]__[hash:base64:5]!postcss-loader'
      ],
    },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new CarteBlanche({
      componentRoot: './src/components',
      dest: '/'
    }),
  ],
}
