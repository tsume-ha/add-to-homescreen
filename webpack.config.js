// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const { LOCALES } = require(path.resolve(__dirname, "src/config"));

function createWebpackLocaleConfig(locale) {
  return {
    entry: `./src/${locale ? "build/" : ""}main${
      locale ? `_${locale}` : ""
    }.ts`,
    output: {
      filename: `add-to-homescreen${locale ? `_${locale}` : ""}.min.js`,
      library: "AddToHomescreen",
      libraryExport: "default",
      libraryTarget: "window",
      path: path.resolve(__dirname, "dist"),
    },
    mode: "production",
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        inject: "head",
      }),
      new MiniCssExtractPlugin({
        filename: "add-to-homescreen.min.css",
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "./src/assets", to: "assets" }],
      }),
    ],
    resolve: {
      extensions: [".ts", ".js"],
      fallback: {
        fs: false,
        url: false,
        path: false,
      },
    },
  };
}

module.exports = [createWebpackLocaleConfig(null)].concat(
  LOCALES.map(createWebpackLocaleConfig)
);

// module.exports = {
//   entry: "./src/main.ts",
//   output: {
//     filename: "add-to-homescreen.min.js",
//     library: "AddToHomescreen",
//     libraryExport: "default",
//     libraryTarget: "window",
//     path: path.resolve(__dirname, "dist"),
//   },
//   mode: "production",
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         use: "ts-loader",
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css$/i,
//         use: [MiniCssExtractPlugin.loader, "css-loader"],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./index.html",
//       inject: "head",
//     }),
//     new MiniCssExtractPlugin({
//       filename: "add-to-homescreen.min.css",
//     }),
//     new CopyWebpackPlugin({
//       patterns: [{ from: "./src/assets", to: "assets" }],
//     }),
//   ],
//   resolve: {
//     extensions: [".ts", ".js"],
//     fallback: {
//       fs: false,
//       url: false,
//       path: false,
//     },
//   },
// };
