const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    resolve: {
        alias: {
            "@": require("path").resolve(__dirname, "src"), // change this to your folder path
            'stream': require.resolve('stream-browserify'),
            'process': 'process/browser',
            'util': require.resolve('util/'),
            'crypto': require.resolve('crypto-browserify')
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]&esModule=false',
                    // 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    // 'image-webpack-loader?progressive=true&optimizationLevel=4&interlaced=true'
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                gifsicle: {
                                    interlaced: true,
                                },
                                optipng: {
                                    optimizationLevel: 7,
                                }
                            }
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.ProvidePlugin({
            'process': 'process/browser',
        })
    ]
};