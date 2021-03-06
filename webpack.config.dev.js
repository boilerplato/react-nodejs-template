require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: ['./src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'static/js/bundle.js',
    globalObject: 'this',
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            name: 'static/js/[name].worker.js'
          }
        }
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            name: () => 'static/media/[name].[ext]',
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devServer: {
    host: '0.0.0.0',
    port: process.env.WEBPACK_PORT,
    open: false,
    proxy: {
      '/api': `http://localhost:${process.env.PORT}`
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        minifyJS: true,
      },
    })
  ]
};
