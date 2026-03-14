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
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs'],
      fallback: {
        process: require.resolve('process/browser.js'),
      },
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
        process: ['process/browser.js', 'default'],
      }),
      new webpack.DefinePlugin({
        'process.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || 'https://tixxvcxcrgxscmprldmi.supabase.co'),
        'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeHh2Y3hjcmd4c2NtcHJsZG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzA5MzksImV4cCI6MjA2OTA0NjkzOX0.bhWFkJAMPAnEf9c1rRjEbyYG4XjQnOIP2dsVVeK_H3U'),
      }),
    ],

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    devServer: {
      historyApiFallback: true,
      port: 3000,
      open: true,
      hot: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
    },
  };
};