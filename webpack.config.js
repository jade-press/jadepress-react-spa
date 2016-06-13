var webpack = require('webpack')
var path = require('path')

let config = {
	entry: {
		app: './src/index.js',
	},
	output: {
		filename: 'bundle.js',
		publicPath: '/js/',
		path: path.resolve(__dirname, '/public/js/')
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
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
	,devServer: {
		hot: true
		,quiet: false
		,proxy: {
			'*': {
				target: 'http://localhost:9808',
				secure: false,
				ws: false,
				bypass: function(req, res, opt) {
					console.log(req.path)
					if(/\.json$/.test(req.path) || /\.bundle\.js/.test(req.path)) {
						console.log('bypass', req.path)
						return req.path
					}
				}
			}
		}
	}
}

module.exports = config