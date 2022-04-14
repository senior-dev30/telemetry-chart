const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    eslint: {
        mode: "file",  // Set eslint-loader to load config from package.json
    },
    webpack: {
        plugins: [
          new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.(js|css|html|svg)$/
          }),
          new CompressionPlugin({
            filename: "[path][base].br",
            algorithm: "brotliCompress",
            test: /\.(js|css|html|svg)$/
          }),
        ],
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.resolve.symlinks = false;
            paths.appBuild = webpackConfig.output.path = path.resolve('_build/artifact/frontend');
            return webpackConfig;
        },
    },
};
