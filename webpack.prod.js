const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: 'js/[name].js'
	},
	optimization: {
		moduleIds: 'deterministic'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'WebGL Benchmark',
			meta: {
				'viewport': 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, minimal-ui',
				'apple-mobile-web-app-capable': 'yes'
			},
			hash: true,
			minify: {
				collapseWhitespace: false
			}
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src/bitmap-fonts/',
					to: 'bitmap-fonts/',
					toType: 'dir'
				},
				{
					from: 'src/images/',
					to: 'images/',
					toType: 'dir'
				},
				{
					from: 'src/spritesheets/',
					to: 'spritesheets/',
					toType: 'dir'
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css"
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: [{
					loader: 'babel-loader'
				}]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/'
					}
				}]
			}
		]
	}
});
