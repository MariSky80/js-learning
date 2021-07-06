const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');


let htmlPageNames = ['index', 'form'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    title: `${name} template`,
    template: `${name}.html`,  // `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});
module.exports = {
  entry: {
    index: "./src/index.js",
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
      chunks: ['index']
    }),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/head.html'),
        priority: 'high',
        location: 'head',
        template_filename: ['index.html', 'form.html']
      },
      {
        path: path.join(__dirname, './src/partials/header.html'),
        priority: 'high',
        location: 'main',
        template_filename: ['index.html', 'form.html']
      },
      {
        path: path.join(__dirname, './src/partials/footer.html'),
        priority: 'high',
        location: 'footer',
        template_filename: ['index.html', 'form.html']
      }
    ])
  ].concat(multipleHtmlPlugins),
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
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
