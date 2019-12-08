const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const output = (...pathSegments) => ({
  entry: {
    index: "./script.js"
  },
  output: {
    filename: "script.js",
    path: path.resolve(...pathSegments)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { cacheDirectory: true }
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("postcss-import")(),
                require("postcss-simple-vars")(),
                require("postcss-calc")(),
                require("postcss-nested"),
                require("autoprefixer")(),
                require("postcss-reporter")()
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        preset: ["default", { discardComments: { removeAll: true } }]
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new CleanWebpackPlugin(["build", "stub/build"])
  ]
});

module.exports = [output("build"), output("stub", "build")];
