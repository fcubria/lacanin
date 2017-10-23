
const webpack = require('webpack');
const path = require('path');


const PATHS = {
    js: {
        main: path.join(__dirname, './src/js/main.js'),
    },
    style: {
        styles: path.join(__dirname, 'src/scss/'),
        main: path.join(__dirname, 'src/scss', 'main.scss'),
    },
    build: path.join(__dirname, 'dist'),
    htmlTemplates: path.join(__dirname, 'src/tpls')
};


const commonConfig = {
    
    /* output */
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    /* module */
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(jpg|gif|png|svg)$/,
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]
    }, // module

    resolve: {
        extensions: ['.js', '.jsx']
    }
}


module.exports = {
    PATHS: PATHS,
    commonConfig: commonConfig
}

