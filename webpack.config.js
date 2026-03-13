// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const CopyPlugin = require('copy-webpack-plugin');

// module.exports = (env, argv) => {
//   const isProduction = argv.mode === 'production';

//   return {
//     entry: './src/index.tsx',

//     output: {
//       path: path.resolve(__dirname, 'dist'),
//       filename: isProduction
//         ? 'bundle.[contenthash].js'
//         : 'bundle.js',
//       clean: true,
//       publicPath: './',
//     },

//     mode: isProduction ? 'production' : 'development',

//     resolve: {
//       extensions: ['.tsx', '.ts', '.js', '.jsx'],
//     },

//     module: {
//       rules: [
//         {
//           test: /\.(ts|tsx)$/,
//           exclude: /node_modules/,
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: [
//                 '@babel/preset-react',
//                 '@babel/preset-typescript',
//               ],
//             },
//           },
//         },
//         {
//           test: /\.css$/i,
//           use: ['style-loader', 'css-loader'],
//         },
//         {
//           test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
//           type: 'asset/resource',
//         },
//       ],
//     },

//     plugins: [
//       new HtmlWebpackPlugin({
//         template: './public/index.html',
//         inject: 'body',
//       }),

//       // 🔥 ده الجزء اللي بيحل مشكلة الصور نهائيًا
//       new CopyPlugin({
//         patterns: [
//           {
//             from: path.resolve(__dirname, 'public'),
//             to: path.resolve(__dirname, 'dist'),
//             globOptions: {
//               ignore: ['**/index.html'], // علشان منكررش index
//             },
//           },
//         ],
//       }),

//       new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify(
//           isProduction ? 'production' : 'development'
//         ),

// 'process.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || ''),
//         'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || ''),
//       }),
//       new webpack.ProvidePlugin({
//         process: 'process/browser',
//       }),
//     ],



//     devtool: isProduction ? 'source-map' : 'eval-source-map',

//     devServer: {
//       historyApiFallback: true,
//       compress: true,
//       port: 3000,
//       hot: true,
//       open: true,
//       static: {
//         directory: path.join(__dirname, 'public'),
//       },
//     },
//   };
// };
require('dotenv').config();

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
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      clean: true,
      publicPath: '/',
    },

    mode: isProduction ? 'production' : 'development',

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      fallback: {
        process: require.resolve('process/browser'),
      },
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
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
      }),

      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),

      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),

      new webpack.DefinePlugin({
        'process.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
        'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
        'process.env.NODE_ENV': JSON.stringify(
          isProduction ? 'production' : 'development'
        ),
      }),
    ],

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    devServer: {
      historyApiFallback: true,
      port: 3000,
      open: true,
      hot: true,
      static: './public',
    },
  };
};