const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssMqpacker = require('css-mqpacker');

const parts = require('./webpack.parts');
const PATHS = require('./webpack.config.common').PATHS;
const commonConfig = require('./webpack.config.common').commonConfig;

var config = merge(
    commonConfig,
    parts.setFreeVariable('process.env.NODE_ENV', 'development'),
    {
        devtool: 'eval-source-map', // no hace nada
        /* entry */
        entry: [
            'react-hot-loader/patch',
            PATHS.js.main
        ],
        output: {
            filename: '[name].min.js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "style-loader" // creates style nodes from JS strings
                        },
                        {
                            loader: 'css-loader', // translates CSS into CommonJS
                            options: { importLoaders: 1 }
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
                            loader: "sass-loader" // compiles Sass to CSS
                        }
                    ],
                    include: [PATHS.style.styles]
                },
            ]
        }
    },
    parts.devServer({
        // host: '192.168.1.124',
        // host: '192.168.1.40',
        host: process.env.HOST,
        port: 8090,
        contentBase: PATHS.dist
    })
);

if ((typeof process.env.project !== 'undefined') && (typeof process.env.page !== 'undefined') && (process.env.page !== 'undefined')) {
    var templatePath = './src/.webpack-tpl/' + process.env.project + '/' + process.env.page;
    var HtmlWebpackPluginConfig = {
        inject: true,
        filename: process.env.page,
        template: templatePath,
        chunks: [process.env.project]
    };
    module.exports = merge(
        parts.setFreeVariable('process.env.NODE_ENV', 'development'),
        {
            plugins: [
                new HtmlWebpackPlugin(HtmlWebpackPluginConfig)
            ]
        },
        config
    );
} else {
    module.exports = () => {
        return new Promise((resolve, reject) => {

            var cb = (plugins) => {
                var mm = merge(parts.setFreeVariable('process.env.NODE_ENV', 'development'), config, plugins);
                resolve(mm)
            }
            
            var htmlTemplatesPath = PATHS.htmlTemplates,
                WebpackTPLsConfig = {
                    path: htmlTemplatesPath,
                    callback: cb
                };

            if (typeof process.env.project !== 'undefined') {
                WebpackTPLsConfig.path = WebpackTPLsConfig.path + '/' + process.env.project;
                WebpackTPLsConfig.directory = process.env.project;
            }

            parts.setupWebpackTPLs(WebpackTPLsConfig);
        })
    }
}


