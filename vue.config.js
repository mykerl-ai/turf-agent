// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
//   chainWebpack: (config) => {
//     config.module
//       .rule("graphql")
//       .test(/\.graphql$/)
//       .use("graphql-tag/loader")
//       .loader("graphql-tag/loader")
//       .end();
//   },
//   devServer: {
//     disableHostCheck: true,
//   },
// });

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("graphql")
      .test(/\.graphql$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();
  },
  // devServer: {
  //   disableHostCheck: true,
  // },
};
