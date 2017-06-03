const path = require('path')
const webpack = require('webpack')

module.exports = (options) => {
    const defaultOptions = {
        devtool: false,
        entry: {
            'extensions': ['./src/clients/extensions/index.ts']           
        },
        libraryTarget: 'commonjs2',
        loadersPrepend: [],
        pluginsAppend: [],
        target : 'web',
        node:{
            fs: 'empty'
        },
        externals: {},
        outputPath : path.join(__dirname, '../build')
    }

    options = Object.assign({}, defaultOptions, options)

    return {
        devtool: options.devtool,
        entry: options.entry,
        module: {
            rules: [
                {
                  test: /\.js$/,
                  use: options.loadersPrepend.concat(['babel-loader']),
                  include: path.join(__dirname, 'src')
              },
              {
                  test: /\.ts$/,
                  use: options.loadersPrepend.concat(['babel-loader', {
                      loader: 'ts-loader',
                      options:  { noEmit: true }
                  }])
              }
            ]
        },
        node: options.node,
        output: {
            filename: '[name].js',
         
            path: options.outputPath
        },
        externals: options.externals,
        plugins: [].concat(options.pluginsAppend),
        resolve: {
            extensions: ['.json','.js','.ts'],
            modules: ['node_modules', 'src']
        },
        target: options.target
    }
}
