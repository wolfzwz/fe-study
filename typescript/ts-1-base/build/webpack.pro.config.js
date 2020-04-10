// 每次打包后文件名中含有hash 避免产生太多文件 通过这个插件可以清除打包目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}
