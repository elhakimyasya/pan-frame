const path = require('path');
const terserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/script.js',
    output: {
        filename: 'scripts.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer', {}],
                                    ['cssnano', {}],
                                ],
                            },
                        },
                    },

                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.min.css'
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new terserWebpackPlugin({
                extractComments: false,
                terserOptions: {
                    mangle: true,
                    compress: true,
                    format: {
                        comments: false,
                    },
                },
            })
        ],
    },
    watch: true
};