const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function config(env) {
  return {
    entry: [
      'webpack/hot/only-dev-server',
      './src/client/app.js',
    ],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'index-bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        manifest: './public/manifest.json',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({ 'process.env.API_URL': JSON.stringify(env.API_URL) }),
    ],
    devServer: {
      hot: true,
      historyApiFallback: true,
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    },
  };
}

module.exports = config;
