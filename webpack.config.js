const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public'
        }
      ],
    }),
  ],
};
