const webpack = require('webpack')
const commonConfig = require('./common.webpack.config')
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = commonConfig({
  entry: {
    'index': ['./src/clients/mobiles/index.ts']
  },
  outputPath: path.join(__dirname, '../build/client'),
  libraryTarget: 'umd',
  pluginsAppend: [
    new CopyWebpackPlugin([{
        from: path.join(__dirname, '../src/clients/mobiles/dist/'),
        to: path.join(__dirname, '../build/clients/dist/')
      },
      {
        from: path.join(__dirname, '../src/clients/mobiles/index.html'),
        to: path.join(__dirname, '../build/clients/indx.html')
      }

    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})