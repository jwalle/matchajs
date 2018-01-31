const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/js');
const PHOTOS_DIR = path.resolve(__dirname, 'data/photos');

var basePath = __dirname;

module.exports = {
  watchOptions : {
    poll: 1000
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', ".js", ".json"]
},
  context: path.resolve(basePath, 'src'),
  entry: {
    app: './index.tsx',
    // appStyles: './**/*.css'
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.tsx?$/,
        exclude : '/node_modules/',
        loader : 'ts-loader'
      },{
        test: /\.css$/,
        loader: 'style-loader',
    }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
        }
    },{
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: PHOTOS_DIR,
        loader: "file-loader?name=../photos/[name].[ext]"}
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    noInfo: true,
  }
};
