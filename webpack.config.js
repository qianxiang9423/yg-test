// 获取环境命令，并去除首尾空格
console.log('mmmmm',process.env.NODE_ENV)
const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig,"");
// console.log('>>>>>>',env);

// 根据环境变量引用相关的配置文件
module.exports = require(`./config/webpack.config.${env}.js`)