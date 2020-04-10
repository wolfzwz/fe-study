const merge = require("webpack-merge");
// 基础配置
const baseConfig = require("./webpack.base.config");
const devConfig = require("./webpack.dev.config");
const proConfig = require("./webpack.pro.config");
// 合并配置 根据不同环境有不同配置
// 这里为函数 参数为环境变量和命令行传递的参数
module.exports = (env, args) => {
  const config = args.mode === "development" ? devConfig : proConfig;
  return merge(baseConfig, config);
};
