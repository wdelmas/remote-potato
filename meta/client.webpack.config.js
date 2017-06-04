const webpack = require('webpack')
const commonConfig = require('./common.webpack.config')
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = commonConfig({
  entry: {
    'index': ['./src/server/client.ts']
  },
  outputPath: path.join(__dirname, '../build/client'),
  libraryTarget: 'umd',
  pluginsAppend: [  
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})