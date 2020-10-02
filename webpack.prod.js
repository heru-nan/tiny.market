const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: { index: "./src/front/index.js", cart: "./src/front/indexCart.js" },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "",
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/front/public/home/index.html",
      inject: true,
      filename: "index.html",
      chunks: ["index"],
      favicon: "./src/front/public/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "./src/front/public/cart/index.html",
      inject: true,
      filename: "indexCart.html",
      chunks: ["cart"],
      favicon: "./src/front/public/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "./src/front/public/404.html",
      inject: true,
      filename: "404.html",
      favicon: "./src/front/public/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/css/",
            },
          },
          "css-loader",
        ],
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
