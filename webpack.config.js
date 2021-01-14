const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './app/main.js',
  mode: isDev ? 'development' : 'production',
  output: {
    path: __dirname,
    filename: `./${isDev ? 'public' : 'build'}/bundle.js`
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './public',
  },
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
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // injects bundle.js to our new index.html
      inject: true,
      // copys the content of the existing index.html to the new /build index.html
      template:  './public/index.html',
      filename: './build/index.html'
    }),
  ]
}
