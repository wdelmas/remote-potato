const webpack = require('webpack')
const commonConfig = require('./common.webpack.config')
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

let filesToCopy = [
  'index.html',
  'favicons',
  'splash-screens',
  'manifest.json'
]

module.exports = commonConfig({
  entry: {
    'index': ['./src/clients/mobiles/index.tsx']
  },
  outputPath: path.join(__dirname, '../build/clients'),
  libraryTarget: 'umd',
  devtool: "source-map",
  pluginsAppend: [
    new CopyWebpackPlugin(filesToCopy.map(file => {
      return {
        from: path.join(__dirname, `../src/clients/mobiles/${file}`),
        to: path.join(__dirname, `../build/clients/${file}`)
      }
    })),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ], rulesAppend: [
    // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
    { test: /\.tsx?$/, loader: "awesome-typescript-loader", include: path.join(__dirname, 'src') },
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    { enforce: "pre", test: /\.js$/, loader: "source-map-loader", include: path.join(__dirname, 'src') }
  ], externals: {
    "node": "node"
  },
})