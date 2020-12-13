const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
          esModule: false,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  }
};