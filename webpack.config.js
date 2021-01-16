const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: ['@babel/polyfill', './app/main.js'],
  mode: isDev ? 'development' : 'production',
  output: {
    path: __dirname,
    filename: `./${isDev ? 'public' : 'build'}/bundle.js`
  },
  devtool: isDev ? 'source-map' : undefined,
  devServer: isDev ? {
    contentBase: './public',
  } : {},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // disable injection of bundle.js to our new index.html
      inject: false,
      // copys the content of the existing index.html to the new /build index.html
      template:  './index.html',
      filename: `./${isDev ? 'public' : 'build'}/index.html`
    }),
  ]
}
