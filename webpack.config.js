var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		filename: 'bundle.js',
		publicPath: '/public/js/',
		path: path.resolve(__dirname, '/public/js/')
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin()
	],
	devtool: '#eval-source-map',
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				loaders: ['babel'],
				include: path.join(__dirname, '/src')
			}
			,{
				test: /\.(html|css)$/,
				loader: 'raw-loader'
			}
		]
	}
}