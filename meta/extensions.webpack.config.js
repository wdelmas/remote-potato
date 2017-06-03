const webpack = require('webpack')
const commonConfig = require('./common.webpack.config')
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = commonConfig({
  entry: {
    'extensions': ['./src/clients/extensions/index.ts'],
    'background': ['./src/clients/extensions/background/index.ts'],
    'injected': ['./src/clients/extensions/injected/index.ts'],
  },
  outputPath: path.join(__dirname, '../build/extensions'),
  libraryTarget: 'umd',
  pluginsAppend: [
    new CopyWebpackPlugin([{
        from: path.join(__dirname, '../src/clients/extensions/manifest.json'),
        to: path.join(__dirname, '../build/extensions/manifest.json')
      },
      {
        from: path.join(__dirname, '../src/clients/extensions/icon.png'),
        to: path.join(__dirname, '../build/extensions/icon.png')
      },
      {
        from: path.join(__dirname, '../src/clients/extensions/popup.html'),
        to: path.join(__dirname, '../build/extensions/popup.html')
      },
      {
        from: path.join(__dirname, '../src/clients/extensions/background.html'),
        to: path.join(__dirname, '../build/extensions/background.html')
      }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})