const path = require('path')
const webpack = require('webpack')
var os = require('os');

const prod = process.argv.indexOf('-p') !== -1;
const heroku_host = `https://${process.env.HEROKU_APP_NAME || 'remote-potato'}.herokuapp.com/`
console.log('-- PRODUCTION MODE : ' + prod)
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
    loadersPrepend: [],
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
      rules: [{
          test: /\.js/,
          use: options.loadersPrepend.concat(['babel-loader']),
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.ts/,
          use: options.loadersPrepend.concat(['babel-loader', {
            loader: 'ts-loader',
            options: { noEmit: false }
          }])
        }
      ]
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
        debug: options.debug,
        WEBPACK_HOST: `"${getInternalIp()}"`,
        HEROKU_PORT: process.env.PORT ? `"${process.env.PORT}"` : null,
        HEROKU_HOST: options.debug ? null : `"${heroku_host}"`
      })
    ].concat(options.pluginsAppend),
    resolve: {
      extensions: ['.json', '.js', '.ts'],
      modules: ['node_modules', 'src']
    },
    target: options.target
  }
}