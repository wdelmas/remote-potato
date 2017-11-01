const webpack = require('webpack')
const commonConfig = require('./common.webpack.config')
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

let filesToCopy = [
  'manifest.json',
  'icon.png',
  'icon-128.png',
  'popup.html',
  'background.html',
  'on-install.html',
  'injected.css'
]

module.exports = commonConfig({
  entry: {
    'extensions': ['./src/clients/extensions/index.ts'],
    'background': ['./src/clients/extensions/background/index.ts'],
    'injected': ['./src/clients/extensions/injected/index.ts'],
  },
  outputPath: path.join(__dirname, '../build/extensions'),
  libraryTarget: 'umd',
  pluginsAppend: [
    new CopyWebpackPlugin(
      filesToCopy.map(file => {
        return {
          from: path.join(__dirname, `../src/clients/extensions/${file}`),
          to: path.join(__dirname, `../build/extensions/${file}`)
        }
      })),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})