const path = require('path')
const webpack = require('webpack')
var os = require('os');

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
    debug: process.env.NODE_ENV !== 'production',
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
        test: /\.js$/,
        use: options.loadersPrepend.concat(['babel-loader']),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.ts$/,
        use: options.loadersPrepend.concat(['babel-loader', {
          loader: 'ts-loader',
          options: { noEmit: true }
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
        HEROKU_HOST: options.debug ? null : `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/`
      })
    ].concat(options.pluginsAppend),
    resolve: {
      extensions: ['.json', '.js', '.ts'],
      modules: ['node_modules', 'src']
    },
    target: options.target
  }
}