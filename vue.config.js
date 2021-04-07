const path = require("path");
const IS_PROD = ["production", "test"].includes(process.env.NODE_ENV);
module.exports = {
  //基本路径
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  //输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  //eslint-loader是否在保存的时候检查
  lintOnSave: false,
  /**
   * webpack配置，see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   */
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/icons"]
      });
  },
  configureWebpack: config => {
    config.resolve = {
      //配置解析别名
      extensions: [".js", ".json", ".vue"],
      alias: {
        vue: "vue/dist/vue.js",
        "@": path.resolve(__dirname, "./src")
      }
    };
  },
  //生产环境是否生产sourceMap文件
  productionSourceMap: false,
  css: {
    //是否使用css分离插件，ExtractTextPlugin
    extract: IS_PROD,
    //开启css source maps？
    sourceMap: false,
    //css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/styles/variables.scss";@import "@/assets/styles/mixin.scss";`
      }
    }
    //启用css modules for all css/preprocessor file
    // module: false
  },
  parallel: require("os").cpus().length > 1,
  pwa: {},
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8080,
    // https: false,
    // hot: true,
    // hotOnly: false,
    // proxy: {
    //   "/devapi": {
    //     target: "", //开发环境测试接口
    //     changeOrigin: true, //是否跨域
    //     ws: true,
    //     pathRewrite: {
    //       "^/devapi": "" //重写接口
    //     }
    //   }
    // },
    // overlay: {
    //   warnings: false,
    //   errors: false
    // },
    // before: app => { }
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {}
};