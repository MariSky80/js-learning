const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let htmlPageNames = ['form'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    title: name,
    template: `${name}.html`,  // `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = {
  entry: {
    main: "./src/index.js",
    form: "./src/form.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Index template',
      filename: 'index.html',
      template: 'index.html',
      chunks: ['main']
    })
  ].concat(multipleHtmlPlugins),
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};
