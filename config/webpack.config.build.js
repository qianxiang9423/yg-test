//webpack打包配置
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
var HtmlStringReplace = require('html-string-replace-webpack-plugin');
const base = require('./webpack.config.base.js');
var { resPath } = require('./constant'); // 常量

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
        new HtmlStringReplace({
            enable: true,
            patterns: [
                {
                    match: /\/images\//g,
                    replacement: function (match) {
                        return resPath + match;
                    }
                },
                {
                    match: /src=\"js\//g,
                    replacement: function (match) {
                        var splitStr = match.split('"')
                        return `${splitStr[0]}"${resPath}/${splitStr[1]}`;
                    }
                },
                {
                    match: /src=\"\/js\//g,
                    replacement: function (match) {
                        var splitStr = match.split('"')
                        return `${splitStr[0]}"${resPath}${splitStr[1]}`
                    }
                },
                {
                    match: /href=\"iconfont\//g,
                    replacement: function (match) {
                        var splitStr = match.split('"')
                        return `${splitStr[0]}"${resPath}/${splitStr[1]}`;
                    }
                },
                {
                    match: /src=\"iconfont\//g,
                    replacement: function (match) {
                        var splitStr = match.split('"')
                        return `${splitStr[0]}"${resPath}/${splitStr[1]}`;
                    }
                },
                {
                    match: /href=\"css\//g,
                    replacement: function (match) {
                        var splitStr = match.split('"')
                        return `${splitStr[0]}"${resPath}/${splitStr[1]}`;
                    }
                }
            ]
        }),
    ],
});