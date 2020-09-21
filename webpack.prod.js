const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: { index: "./src/front/index.js", cart: "./src/front/indexCart.js" },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/home/index.html",
      inject: true,
      chunks: ["index"],
      favicon: "./public/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "./public/cart/index.html",
      inject: true,
      filename: "indexCart.html",
      chunks: ["cart"],
      favicon: "./public/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "./public/404.html",
      inject: true,
      filename: "404.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|png|jpg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images",
        },
      },
    ],
  },
};
