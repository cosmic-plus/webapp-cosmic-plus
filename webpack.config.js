module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/web/",
    filename: "index.js",
    chunkFilename: "[name].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(html|svg)$/,
        loader: "raw-loader"
      }
    ]
  }
}
