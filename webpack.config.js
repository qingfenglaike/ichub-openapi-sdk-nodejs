const path = require('path');
const webpack = require('webpack');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // 入口，是一个对象
    entry: {
        index: './src/main.js',
    },

    // 输出
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'js/ichub-openapi-sdk.js',
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        path: 'empty',
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 name: "vendor",
    //                 chunks: "initial"
    //             }
    //         }
    //     },
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             uglifyOptions: {
    //                 compress: false
    //             }
    //         })
    //     ]
    // },
    // plugins: [
    //     new BundleAnalyzerPlugin({analyzerPort: 8919})
    // ],
    // 指定loader
    module: {
        // rules中的每一项是一个规则
        rules: [
            {
                // test: /\.js$/, // 值一个正则，符合这些正则的资源会用一个loade来处理
                // use: {
                //     loader: 'babel-loader', // 使用bable-loader来处理
                //     options: {  // 指定参数
                //         presets: [
                //             ['babel-preset-env', {
                //                 targets: {
                //                     browsers: ['> 1%', 'last 2 version'] //具体可以去babel-preset里面查看
                //                 }
                //             }]
                //
                //         ] // 指定哪些语法编译
                //     }
                // },
                exclude: '/node_module/' // 排除在外
            }
        ]
    },

    performance: {hints: false}
};