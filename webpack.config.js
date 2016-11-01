var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var config = {
  entry: {
    index: './app/router/index.js',  // 入口配置路由
  },
  output: {
    path: path.join(__dirname,'build'),
    filename: 'js/[name].js',
    publicPath: '/build/'
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"),
    new HtmlwebpackPlugin({
      title: '无限滚动',
      filename: '../index.html',  // 相对于path的 把html文件生成项目的根目录下
      template: './app/html/index.html',
      inject: true,
      hash: true,
      chunks: ['index']
      //favicon: 'images/favicon.ico'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx','.css']
  },
  devtool: '#source-map',
  module: {
    loaders: [
      { test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/, 
        loader: "style!css"
      },
      {
        test: /.(png|jpg)$/, 
        loader: 'url?limit=8192&name=img/[hash:8].[name].[ext]'
      }
    ]
  }
}
module.exports = config