const webpack = require('webpack')
const commonConfig = require('./common.webpack.config')
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = commonConfig({
  entry: {
    'index': ['./src/server/index.ts'],
    'client': ['./src/server/client.ts']
  },
  outputPath: path.join(__dirname, '../build/server'),
  libraryTarget: 'commonjs2',
  target: 'node',
   node:{
        fs: true,
        Buffer: true,
        __filename: false,
        __dirname: false,
        child_process: "empty"
    },
  externals: ["ws", "socket.io"],
  pluginsAppend: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../src/server/index.html'),
        to: path.join(__dirname, '../build/server/index.html')
      }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})