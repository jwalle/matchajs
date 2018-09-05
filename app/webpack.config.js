const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/js');
const PHOTOS_DIR = path.resolve(__dirname, 'data/photos');
const IMAGES_DIR = path.resolve(__dirname, 'data/images');
const FONT_DIR = path.resolve(__dirname, 'data/fonts');

var basePath = __dirname;

module.exports = {
  // watchOptions : {   poll: 300,   aggregateTimeout: 300 },
  resolve: {
    extensions: ['.ts', '.tsx', ".js", ".json"]
  },
  context: path.join(basePath, 'src'),
  entry: {
    main: './index.tsx'
  },
  // appStyles: '',
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }
          ]
        })
      }, {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        loader: 'ts-loader'
      }, {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        include: [
          /node_modules/, IMAGES_DIR, FONT_DIR
        ],
        exclude: [
          PHOTOS_DIR
        ],
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }, {
        test: /\.s?css$/,
        include: [/node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader'
            },
          ]
        })
      }
    ]
  },
  //devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    hot: false,
    port: 8080,
    noInfo: true,
    historyApiFallback: true,
    proxy: {
      "/api/**": {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({title: 'Matcha', template: 'index.html'}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/)
  ]
};