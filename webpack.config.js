const path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  target: "web",
  watch: true,
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "icons",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  entry: {
    "popup/popup": "./src/popup/index.tsx",
    background: "./src/background/index.ts",
    "x-media-gal": "./src/content/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(".", "ext"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/config/manifest.json", to: "manifest.json" },
        { from: "src/popup/index.html", to: "popup/popup.html" },
        { from: "src/icons/*.png", to: "icons/[name][ext]" },
      ],
    }),
  ],
};
