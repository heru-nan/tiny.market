const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: { index: "./src/front/index.js", cart: "./src/front/indexCart.js" },
  devServer: {
    historyApiFallback: {
      index: "./src/front/public/404.html",
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/front/public/home/index.html",
      inject: true,
      chunks: ["index"],
      favicon: "./src/front/public/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "./src/front/public/cart/index.html",
      inject: true,
      filename: "shopcart",
      chunks: ["cart"],
      favicon: "./src/front/public/favicon.ico",
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
