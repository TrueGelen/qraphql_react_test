const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const buildWebpackConfig = merge(baseWebpackConfig, {
	// BUILD config
	mode: 'production',
	plugins: [
		new MomentLocalesPlugin({
			localesToKeep: ['es-us', 'ru'],
		}),
	]
})

module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig)
})
