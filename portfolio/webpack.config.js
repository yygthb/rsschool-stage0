const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: MiniCssExtractPlugin } = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: false,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/img/favicon.ico'),
          to: path.resolve(__dirname, 'dist/assets/img'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/svg/sprite.svg'),
          to: path.resolve(__dirname, 'dist/assets/svg'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/img/video.jpg'),
          to: path.resolve(__dirname, 'dist/assets/img/'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/img/portfolio'),
          to: path.resolve(__dirname, 'dist/assets/img/portfolio'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: {} },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },
    ],
  },
};
