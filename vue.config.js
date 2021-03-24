/*
 * @Description: 
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-09-25 09:24:02
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-04 10:44:39
 */

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '.', dir) // 这里采用一个点，因为vue.config.js文件和package.json文件都在同一个目录下，即根目录下
}

module.exports = {
    // // 将构建好的文件输出到哪里
    // outputDir: './dist',
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    assetsDir: "static",
    // 输出文件目录
    outputDir: "h5_001",
      // 生产环境是否生成 sourceMap 文件
     productionSourceMap: false,
    devServer: {
        port: 8080,
        open: true, // 编译完成是否打开网页
        hot: true // 开启热加载
      },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                '@pages': resolve('src/Pages'),
                '@images': resolve('src/Images'),
            }
        },
    },

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 36, //换算基数，1rem相当于10px,值为37.5时,1rem为20px,淘宝的flex默认为1rem为10px 
                        // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                        //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                        // propBlackList: [], //黑名单
                        exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        // selectorBlackList: [], //要忽略并保留为px的选择器
                        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                        mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    }),
                ]
            }
        }
    },
    chainWebpack: config => {
        config.module
          .rule('images')
          .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 6800,esModule: false}))
      }
    
}