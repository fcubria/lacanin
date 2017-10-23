const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');





exports.setFreeVariable = function (key, value) {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
}



/* ----------------------------------------------------------------------------------- */
/* css */
exports.minify = function () {
    return {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ]
    };
  }
  
  exports.unminify = function () {
    return {
      plugins: [
        new UnminifiedWebpackPlugin()
      ]
    };
  }
  
  exports.extractSCSS = function () {
    return {
      module: {
        rules: [
          {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                          {
                            loader: 'css-loader',
                            query: {
                                minimize: true
                            }
                          },
                          {
                              loader: 'postcss-loader',
                              options: {
                                  plugins: [
                                      cssMqpacker({sort: true})
                                  ]
                              }
                          },
                          {
                              loader: 'sass-loader'
                          }
                      ]
              })
          },
        ]
      },
      plugins: [
        new ExtractTextPlugin('[name].min.css')
      ]
    };
  }



/* ----------------------------------------------------------------------------------- */
/* tpls para webpack */
exports.setupWebpackTPLs = function (options) {

    options = (typeof options !== 'undefined') ? options : {};

    var plugins = (typeof options.plugins !== 'undefined') ? options.plugins : [],
        tplsPath = options.path,
        callback = (typeof options.callback !== 'undefined') ? options.callback : Function.prototype,
        tpls = fs.readdirSync(tplsPath),
        directory = (typeof options.directory !== 'undefined') ? options.directory + '/' : '',
        chunk = (typeof options.directory !== 'undefined') ?  + '/' : '';

    tpls.forEach(function(tpl, index) {

        var tplPath = path.join(tplsPath, tpl),
            HtmlWebpackPluginConfig;

        if (fs.statSync(tplPath).isDirectory()) {
            exports.setupWebpackTPLs({
                path: tplPath,
                plugins: plugins,
                directory: tpl
            });
        } else {
            HtmlWebpackPluginConfig = {
                inject: true,
                // filename: directory + tpl,
                filename: tpl,
                template: tplPath
            };
            if (typeof options.directory !== 'undefined') {
                HtmlWebpackPluginConfig.chunks = [options.directory]
            }

            plugins.push(new HtmlWebpackPlugin(HtmlWebpackPluginConfig));
        }

    });

    callback({
        plugins: plugins
    });

}


/* ----------------------------------------------------------------------------------- */
/* dev server */
exports.devServer = function (options) {
    return {
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,

            hot: true,
            host: options.host, // Defaults to `localhost`
            port: options.port, // Defaults to 8080

            contentBase: options.contentBase
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    };
}







