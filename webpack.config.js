module.exports = {
  entry: [
    // Fix https://github.com/babel/babel/issues/9873
    "core-js/modules/es.array.iterator",
    "./src/index.js"
  ],
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
