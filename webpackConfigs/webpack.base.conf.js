const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  // src: path.join(__dirname, '../src'),
  // src: path.join(__dirname, '../dist'),
  static: 'assets/'
  // static: path.resolve(__dirname, '../dist/assets'),
}

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    build: `${PATHS.src}/index.js`,
    // module: `${PATHS.src}/your-module.js`,
  },
  output: {
    filename: `js/[name].js`,
    path: PATHS.dist,
    publicPath: '' //"/" что бы появилась косая на выходе в index.html
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/js'),
      '~c': path.resolve(__dirname, 'src/js/components'),
      '~p': path.resolve(__dirname, 'src/js/containers'),
      '~s': path.resolve(__dirname, 'src/js/store')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-transform-react-jsx",
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              ["@babel/plugin-transform-runtime"]
            ]
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[folder]/[name].[ext]',
          outputPath: `../${PATHS.static}/fonts/`
        }
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]_[sha1:hash:hex:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, postcssOptions: { config: `./postcss.config.js` } }
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.module\.css$/,
        exclude: /node_modules/,
        use: [
          //'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[local]__[sha1:hash:hex:7]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, postcssOptions: { config: `./postcss.config.js` } }
          }
        ]
      },
      {
        test: /^((?!\.module).)*css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, postcssOptions: { config: `./postcss.config.js` } }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
    }),
    // Copy HtmlWebpackPlugin and change index.html for another html page
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: 'index.html',
      inject: true
    }),
    new CopyPlugin({
      patterns: [
        { from: `${PATHS.src}/imgs`, to: `${PATHS.static}/imgs` },
        { from: `${PATHS.src}/fonts`, to: `${PATHS.static}/fonts` },
        // { from: `${PATHS.src}/static`, to: '' },
      ]
    })
  ]
}


//MiniCssExtractPlugin.loader,