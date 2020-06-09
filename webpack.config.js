const path = require(`path`);

module.exports = {
  entry: `./src/index.jsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`), // eslint-disable-line
  },

  devServer: {
    contentBase: path.join(__dirname, `public`), // eslint-disable-line
    open: false,
    port: 1337,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },

  resolve: {
    extensions: [`.js`, `.jsx`, `.json`]
  },

  devtool: `source-map`,
};
