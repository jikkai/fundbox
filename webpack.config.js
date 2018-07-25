const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    app: ['@babel/polyfill', './src/app/index.jsx']
  },
  output: {
    path: path.join(__dirname, './lib'),
    filename: '[name]/[name].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      '~': path.join(__dirname, './src')
    }
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: process.env.APP_ENV !== 'dev'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: 'url-loader?limit=1000000'
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, './public'),
        to: path.join(__dirname, './lib')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css'
    })
  ]
}
