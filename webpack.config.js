const path = require('path');
const merge = require('webpack-merge');

const commonConfig = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  module: {
    rules: [{
      test: /\js$/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'sourcemap',
};

const webConfig = {.
  target: 'web',
  output: {
    filename: 'primoExploreCustomRequests.min.js',
    library: 'primoExploreCustomRequests',
    libraryTarget: 'var',
  },
};

const nodeConfig = {
  target: 'node',
  output: {
    library: 'primoExploreCustomRequests',
  },
  optimization: {
    minimize: false,
  }
};

module.exports = [
  merge.smart(
    commonConfig,
    webConfig,
  ),
  merge.smart(
    commonConfig,
    nodeConfig
  ),
];