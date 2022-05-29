const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
});

// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// module.exports = {
//   // Other rules...
//   plugins: [new NodePolyfillPlugin()],
// };
// module.exports = {
//   configureWebpack: {
//     resolve: {
//       fallback: {
//         fs: false,
//         tls: false,
//         net: false,
//         path: false,
//         zlib: false,
//         http: false,
//         https: false,
//         stream: false,
//         crypto: false,
//         os: false,
//         readline: false,
//         child_process: false,
//         constants: false,
//       },
//     },
//   },
// };
