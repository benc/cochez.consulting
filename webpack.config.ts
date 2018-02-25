import * as CleanWebpackPlugin from "clean-webpack-plugin";
import CopyWebpackPlugin = require("copy-webpack-plugin");
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin = require("html-webpack-plugin");
import * as path from "path";
import * as webpack from "webpack";

const paths = {
  BASE: path.resolve(__dirname),
  DIST: path.resolve(__dirname, "public"),
  NODE_MODULES: path.resolve(__dirname, "node_modules"),
  SRC: path.resolve(__dirname, "src")
};

const mode = process.env.NODE_ENV || "development";

interface IConfig extends webpack.Configuration {
  // forceer typings om enkel webpack 2.x (en hoger) syntax te gebruiken
  module: {
    rules: webpack.NewUseRule[];
  };
}

const config: IConfig = {
  devtool: "cheap-module-eval-source-map",
  entry: {
    app: `${paths.SRC}/app.ts`,
    styles: `${paths.SRC}/styles.sass`
  },
  output: {
    path: paths.DIST,
    filename: "[name].[hash].js"
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: `${paths.SRC}/static/`,
          to: `${paths.DIST}`
        }
      ],
      {copyUnmodified: true}
    ),
    new HtmlWebpackPlugin({
      template: `${paths.SRC}/index.html.ejs`,
      mode
    }),
    new ExtractTextPlugin("app.[hash].css")
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                errLogToConsole: true,
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(eot|svg|cur|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            limit: 10000
          }
        }
      },
      {
        test: /\.(jpg|png|webp|gif|otf|woff|woff2|ani)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[hash].[ext]",
            limit: 10000
          }
        }
      },
      {test: /\.json$/, use: {loader: "json-loader"}}
    ]
  },
  resolve: {
    extensions: [".sass"]
  },
  devServer: {
    inline: false,
    hot: false,
    historyApiFallback: true,
    port: 3000
  }
};

if (mode === "development") {
  if (!process.env.DISABLE_HOT_RELOADING) {
    // gebruik dit als je een ander live reload systeem wil gebruiken, zoals Webstorm Live Edit
    config.devServer.hot = true;
    config.plugins.push(new webpack.NamedModulesPlugin());
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
}

if (mode === "production") {
  config.devtool = "source-map";
  config.plugins.push(
    new CleanWebpackPlugin([paths.DIST], {
      exclude: [".git"]
    })
  );
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({parallel: true, sourceMap: true}));
}

export default config;
