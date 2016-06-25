const path = require('path')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ],
      },
      {
        test: /\.json/,
        loader: 'json-loader',
      },
    ],
    include: path.resolve(__dirname, '../')
  }
}
