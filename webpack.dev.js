const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: { index: "./src/index.js" },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/home/index.html",
      inject: true,
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/cart/index.html",
      inject: true,
      filename: "cart",
      chunks: ["index"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
