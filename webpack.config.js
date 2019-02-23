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
        loader: "babel-loader",
        include: [/src\//, /node_modules\/@cosmic-plus\//]
      }
    ]
  }
}
