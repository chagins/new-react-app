const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: isProduction ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    clean: true,
  },
  target: 'web',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './public')
    },
    port: 'auto',
    open: true,
    hot: true,
    liveReload: true,
    client: {
      reconnect: 5,
      progress: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? 'css/[contenthash].css' : 'css/[name].css',
    }),
    new WebpackManifestPlugin({
      fileName: "assets-manifest.json",
      publicPath: '',
      filter: (({name}) => name.endsWith('.map') ? false : true)
    }),
    new CopyPlugin({
      patterns: [
        {
          context: 'public',
          from: '**/*',
          to: '[name][ext]',
          globOptions: {
            ignore: ["**/index.html",],
          },
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        use: 'babel-loader',
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.(svg|png|jpg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/img/[hash][ext][query]'
        }
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
