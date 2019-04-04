const path = require('path');

module.exports = {
  entry: {
    main:'./app/javascript/src/main.js',
    creator: './app/javascript/src/creator/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'app/assets/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
  mode: 'development'
};
