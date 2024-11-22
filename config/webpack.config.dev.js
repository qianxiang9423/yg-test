//webpack开发环境配置
const merge = require('webpack-merge');
const base = require('./webpack.config.base.js');

module.exports = merge(base, {
    devServer: {
        // contentBase: path.join(__dirname, "../dist"),
        // host: 'dev.kemai.com',
        host: '0.0.0.0',
        port: 8888, //端口
        inline: true,
        hot: false,
    }
});
