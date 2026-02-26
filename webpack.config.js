const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction
        ? 'bundle.[contenthash].js'
        : 'bundle.js',
      clean: true,
      publicPath: '/',
    },

    mode: isProduction ? 'production' : 'development',

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body',
      }),

      // 🔥 ده الجزء اللي بيحل مشكلة الصور نهائيًا
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
            globOptions: {
              ignore: ['**/index.html'], // علشان منكررش index
            },
          },
        ],
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProduction ? 'production' : 'development'
        ),

        'process.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
        'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY),
      }),
    ],

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    devServer: {
      historyApiFallback: true,
      compress: true,
      port: 3000,
      hot: true,
      open: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
    },
  };
};