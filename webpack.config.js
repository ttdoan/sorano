// Webpack uses this to work with directories
const path = require("path");
const webpack = require("webpack");

let outputPath = "dist";

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do.
module.exports = {
  // Path to your entry point. From this file, Webpack will begin its work.
  entry: {
    index: "./src/client/js/index.js",
  },

  // Webpack will bundle all Javascript source code into <filename> and output
  // to <path>. FYI, __dirname is the
  output: {
    path: path.resolve(__dirname, outputPath),
    // [name] is based on the name of the key for the entry point.
    filename: "[name].js",
  },

  plugins: [],

  // Deploys a server to automatically (by default) load your HTML file.
  // Reduces the development process by not requiring you to manually
  // load your HTML file into your browser.
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          // Need Babel to transpile ES2015/JSX to JavaScript
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: [/node_modules/, `/${outputPath}`],
      },

      {
        test: /\.css$/,
        // CSS-loader: resovles all URL's
        // Style-loader: properly imports CSS modules
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(png|jpe?g|gif|doc)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },

      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },

      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer Dart-Sass
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
