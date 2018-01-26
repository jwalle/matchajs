const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/js');
const APP_DIR = path.resolve(__dirname, 'src');
const PHOTOS_DIR = path.resolve(__dirname, 'data/photos');

module.exports = {
  watchOptions : {
    poll: 1000
  },
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel',
          query: {
              presets: ['es2015', 'react']
          }
      }, {
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
  }
};
