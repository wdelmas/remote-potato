const webpack = require('webpack')
const commonConfig = require('./common.webpack.config')
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = commonConfig({
  entry: {
    'index': ['./src/server/index.ts']
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})