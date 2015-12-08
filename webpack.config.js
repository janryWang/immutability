var webpack = require('webpack');

module.exports = {
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', exclude: /node_modules/,query: {
				cacheDirectory: true,
				presets: ['es2015','react','stage-0']
			} }
		]
	},
	externals:{
		'react': {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'immutable': {
			root: 'Immutable',
			commonjs2: 'immutable',
			commonjs: 'immutable',
			amd: 'immutable'
		}
	},
	output: {
		library: 'Immutability',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['', '.js']
	}
};