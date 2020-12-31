const { resolve } = require('path');

const webpack = require('webpack');
const sassModule = require('sass');

// webpack plugin modules
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// project directory path
const entryPath = resolve(__dirname, 'public');
const outPath = resolve(__dirname, 'dist');

// config env vars
const ENV = process.env.NODE_ENV || 'dev';
const PRODUCTION = process.env.NODE_ENV === 'prod';

// the path(s) that should be cleaned
const PathsToClean = ['dist'];

// the clean options to use
const CleanOptions = {
  verbose: PRODUCTION ? false : true,
};

// config plugins
const WebpackConfigPlugins = [
  new MiniCssExtractPlugin({
    mode: PRODUCTION ? 'production' : 'dev',
    filename: 'bundle.css',
  }),
  new CleanPlugin(
    // the path(s) that should be cleaned
    PathsToClean,
    // the clean options to use
    CleanOptions
  ),
  new CopyPlugin({
    patterns: [
      {
        from: resolve(entryPath, 'index.html'),
      },
    ],
  }),
  new webpack.DefinePlugin({
    'process.env.ENV': JSON.stringify(ENV),
  }),
];

const WebpackRules = [
  {
    test: /\.js$/,
    include: entryPath,
    loader: 'babel-loader',
    query: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: '6.11.2',
            },
          },
        ],
        '@babel/react',
      ],
    },
  },
  {
    test: /\.(sc|c)ss$/,
    use: [
      { loader: MiniCssExtractPlugin.loader },
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          implementation: sassModule,
        },
      },
    ],
  },
];
console.log(resolve(entryPath, 'src', 'index.js'));
module.exports = {
  plugins: WebpackConfigPlugins,
  mode: PRODUCTION ? 'production' : 'development',
  devtool: PRODUCTION ? undefined : 'cheap-module-source-map',
  entry: resolve(entryPath, 'src', 'index.js'),
  output: {
    path: outPath,
    filename: 'bundle.js',
  },
  module: {
    rules: WebpackRules,
  },
};
