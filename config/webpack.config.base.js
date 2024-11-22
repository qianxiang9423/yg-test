//webpack基础配置
var glob = require('glob');
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板生成器
var ExtractTextPlugin = require('extract-text-webpack-plugin');//将你的行内样式提取到单独的css文件里,
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 文件拷贝
var { resPath } = require('./constant'); // 常量
const NODE_ENV = process.env.NODE_ENV || "development";

var entryPages = Object.keys(getEntry('./src/view/*/*.js'));
entryPages.push('src/js/common');
var entry = {};
entryPages.map((item, i) => {
    var itemUrl = item.split('/')[2];
    entry[itemUrl] = './' + item + '.js'
})
var config = {
    entry,
    output: {
        path: path.join(__dirname, '../dist'), //打包后生成的目录
        publicPath: NODE_ENV !== 'build' ? '' : resPath,
        //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].[hash:6].js',//根据对应入口名称,生成对应js名称
        chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
    },
    resolve: {
        //设置require或import的时候可以不需要带后缀
        extensions: ['*', '.js', '.less', '.css'],
        alias: {
            '@': path.resolve('src'),
        }
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[ext]",
                            limit: 100, // fonts file size <= 5KB, use 'base64'; else, output svg file
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]?', // 输出文件名格式
                            quality: 50 // 设置JPEG图像的质量为80
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 30720, //30kb 图片转base64。设置图片大小,小于此数则转换。
                    name: 'images/[name].[ext]?' //输出目录以及名称
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 将公共模块提取,生成名为`vendors`的chunk
            minChunks: 3 // 提取至少3个模块共有的部分
        }),
        new ExtractTextPlugin("css/[name].[hash:6].css"), //提取CSS行内样式,转化为link引入
        new CopyWebpackPlugin([
            { from: './src/images', to: './images' }, // 拷贝图片
            { from: './public', to: './' }, // ico
            { from: './src/iconfont', to: './iconfont' }, //拷贝iconfont
            { from: './src/js/idangerous.swiper.js', to: './js/idangerous.swiper.js' }, //拷贝swiper
            { from: './src/js/video.min.js', to: './js/video.min.js' }, //拷贝swiper
            { from: './src/js/jqueryMap', to: './js/jqueryMap' }, //拷贝地图的js
            { from: './src/css/jqueryMap', to: './css/jqueryMap' }, //拷贝地图的css
            { from: './src/css/Swiper.css', to: './css/Swiper.css' }, //拷贝轮播图css
            { from: './src/js/select/fancyspinbox.css', to: './css/fancyspinbox.css' }, //拷贝轮播图css
            { from: './src/js/select/fancyspinbox.js', to: './js/fancyspinbox.js' }, //拷贝轮播图css
            { from: './src/css/video-js.min.css', to: './css/video-js.min.css' }, //拷贝轮播图css
            { from: './src/js/echarts.js', to: './js/echarts.js' }, //拷贝轮播图css
            { from: './src/js/jquery', to: './js/jquery' }, //拷贝jquery
            { from: './src/js/SelectInput.js', to: './js/SelectInput.js' }, //拷贝jquery
            { from: './src/js/jquery.combo.select.js', to: './js/jquery.combo.select.js' }, //拷贝jquery
            { from: './src/js/jquery.z-pager.js', to: './js/jquery.z-pager.js' }, //拷贝jquery
            { from: './src/css/page.css', to: './css/page.css' },
            { from: './src/components/search-input/index.js', to: './js/search-input.js' },
            { from: './src/css/datepicker.css', to: './css/datepicker.css' },
            { from: './src/js/moment.min.js', to: './js/moment.min.js' },
            { from: './src/js/datepicker.all.js', to: './js/datepicker.all.js' },
            { from: './src/js/datepicker.en.js', to: './js/datepicker.en.js' },
        ]),
    ],
};
module.exports = config;

var pages = Object.keys(getEntry('./src/view/*/*.html'));
var confTitle = [
    { name: 'index', title: '首页' },
    { name: 'case', title: '视点' },
    { name: 'analyse', title: '分析报告' },
    { name: 'information', title: '数据发布' },
    { name: 'about', title: '关于我们' },
    { name: 'detail', title: '详情' },
    { name: 'work', title: '工作' },
    { name: 'menu', title: '节目单' },
    { name: 'newDetail', title: '新闻页' },
    { name: 'searchDetail', title: '搜索结果' },
    { name: 'imgDetail', title: '明星详情' }
]
//生成HTML模板
pages.forEach(function (pathname) {
    var itemNameArray = pathname.split('/');
    var htmlName = itemNameArray[itemNameArray.length - 2];
    var conf = {
        filename: htmlName + '.html', //生成的html存放路径,相对于path
        template: pathname + '.html', //html模板路径
        inject: true, //允许插件修改哪些内容,包括head与body
        hash: true, //是否添加hash值
        minify: { //压缩HTML文件
            removeComments: true,//移除HTML中的注释
            collapseWhitespace: true //删除空白符与换行符
        },
    };
    conf.chunks = ['common', htmlName];
    for (var i in confTitle) {
        if (confTitle[i].name === htmlName) {
            conf.title = confTitle[i].title;
        }
    }
    conf.templateParameters = {
        title: config.title
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
});
//按文件名来获取入口文件(即需要生成的模板文件数量)
function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        entries[pathname] = './' + entry;
    }
    return entries;
}
