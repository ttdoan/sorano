const paths = require("./paths");
const { merge } = require("webpack-merge");
const common = require("./webpack.server.common.js");
const nodeExternals = require("webpack-node-externals");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: paths.build + "/server",
    publicPath: "/",
    filename: "server.bundle.js",
  },
  externals: [nodeExternals()],
});
