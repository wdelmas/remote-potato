const webpack = require('webpack')
const commonConfig = require('./common.webpack.config')

module.exports = commonConfig({
    pluginsAppend: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
})
