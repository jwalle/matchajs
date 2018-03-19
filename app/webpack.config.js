const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/js');
const PHOTOS_DIR = path.resolve(__dirname, 'data/photos');
const IMAGES_DIR = path.resolve(__dirname, 'public/images');


var basePath = __dirname;

module.exports = {
  watchOptions : {
    poll: 1000,
    aggregateTimeout: 300
  },
  resolve: {
    extensions: ['.ts', '.tsx', ".js", ".json"]
},
  context: path.join(basePath, 'src'),
  entry: {
      main: './index.tsx',
  },
    // appStyles: '',
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module : {
    loaders : [
      { test: /\.css$/, exclude: [/node_modules/], loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test : /\.tsx?$/, exclude : '/node_modules/', loader : 'ts-loader' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: PHOTOS_DIR,
        loader: "file-loader?name=./data/photos/[name].[ext]"
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        include: [/node_modules/, IMAGES_DIR],        
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
      {
        test: /\.css$/,
        include: [/node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
            },
          ],
        })
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    noInfo: true,
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({title: 'Matcha', template: 'index.html' }),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
  ],
};