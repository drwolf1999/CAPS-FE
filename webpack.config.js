const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    resolve: {
        alias: {
            "@": require("path").resolve(__dirname, "src"), // change this to your folder path
            'stream': require.resolve('stream-browserify'),
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
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    // 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    // 'image-webpack-loader?progressive=true&optimizationLevel=4&interlaced=true'
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            progressive: true,
                            optimizationLevel: 4,
                            interlaced: false,
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: [0.75, 0.90],
                                speed: 3,
                            },
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};