const path = require('path')
const webpack = require('webpack')
var os = require('os');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForceCaseSensitivityPlugin = require( 'force-case-sensitivity-webpack-plugin');
const autoprefixer = require( 'autoprefixer');

const prod = process.argv.indexOf('-p') !== -1;
const heroku_host = `https://${process.env.HEROKU_APP_NAME || 'remote-potato'}.herokuapp.com/`
console.log('-- PRODUCTION MODE : ' + prod)
console.log('-- PORT : ' + process.env.PORT)

if (prod)
  console.log('--  HOST URL : ' + `${heroku_host}`)

const getInternalIp = () => {
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  return addresses[0]
}

module.exports = (options) => {
  const defaultOptions = {
    devtool: false,
    debug: !prod,
    entry: {
      'extensions': ['./src/clients/extensions/index.ts']
    },
    libraryTarget: 'commonjs2',
    rulesAppend: [],
    pluginsAppend: [],
    target: 'web',
    node: {
      fs: 'empty'
    },
    externals: {},
    outputPath: path.join(__dirname, '../build')
  }

  options = Object.assign({}, defaultOptions, options)

  return {
    devtool: options.devtool,
    entry: options.entry,
    module: {
      rules: options.rulesAppend.concat([{
          test: /\.js/,
          use: ['babel-loader'],
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.ts/,
          use: ['babel-loader', {
            loader: 'ts-loader'
          }]
        },
        {
          test: /\.s?css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              },
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /\.(png|svg|gif)$/,
          use: [
            'url-loader',
            'image-webpack-loader'
          ]
        }
      ])
    },
    node: options.node,
    output: {
      filename: '[name].js',
      libraryTarget: options.libraryTarget,
      path: options.outputPath
    },
    externals: options.externals,
    plugins: [
      new webpack.DefinePlugin({
        DEBUG: options.debug,
        LOCAL_HOST: `"${getInternalIp()}"`,
        HEROKU_HOST: options.debug ? null : `"${heroku_host}"`,
        HEROKU_PORT: process.env.PORT ? `"${process.env.PORT}"` : null
      }),
      new ExtractTextPlugin({ filename: '[name].css' }),
      new ForceCaseSensitivityPlugin(),
      new webpack.LoaderOptionsPlugin({
          minimize: true,
          options: {
              postcss: [
                  autoprefixer({
                      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
                  })
              ]
          }
      })
    ].concat(options.pluginsAppend),
    resolve: {
      extensions: [  '.json', '.jsx', '.js', '.ts', '.tsx'],
      modules: ['node_modules', 'src']
    },
    target: options.target
  }
}