//webpack打包配置
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
// var HtmlStringReplace = require('html-string-replace-webpack-plugin');
const base = require('./webpack.config.base.js');

module.exports = merge(base, {
    devtool: 'source-map',//为了能显示，因为懒没弄node server 正常可以省略
    plugins: [
        new CleanPlugin(['../dist']),// 清空dist文件夹
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false// remove all comments
            },
            compress: {
                warnings: false
            },
            sourceMap: true // 如果你在压缩代码时启用了 source map，或者想要让 uglifyjs 的警告能够对应到正确的代码行，你需要将 UglifyJsPlugin 的 sourceMap 设为 true。
        }),
    ],
});