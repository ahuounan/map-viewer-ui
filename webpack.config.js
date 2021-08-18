const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:
      process.env.NODE_ENV === 'development'
        ? '[name].js'
        : '[name].[chunkhash].js',
    clean: true,
  },
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: [/src/, /libs/, /node_modules\/mapbox-gl/],
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.css', '.tsx', '.ts', '.jsx', '.js', '.d.ts'],
    plugins: [new TsconfigPathsPlugin()],
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    runtimeChunk: process.env.NODE_ENV === 'development',
    splitChunks:
      process.env.NODE_ENV === 'production'
        ? {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
                enforce: true,
                reuseExistingChunk: true,
                priority: -10,
              },
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'react',
                chunks: 'all',
                enforce: true,
                reuseExistingChunk: true,
              },
              mapboxgl: {
                test: /[\\/]node_modules[\\/](mapbox-gl)[\\/]/,
                name: 'mapboxgl',
                chunks: 'all',
                enforce: true,
                reuseExistingChunk: true,
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
              },
            },
          }
        : false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template/index.html',
      inject: true,
      scriptLoading: 'defer',
    }),
    new Dotenv(),
    ...(process.env.NODE_ENV === 'production'
      ? [
          new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css',
          }),
          new CompressionPlugin({
            test: /\.(js|css|html)(\?.*)?$/i,
            filename: '[path][base]',
            deleteOriginalAssets: true,
          }),
        ]
      : []),
  ],
};
