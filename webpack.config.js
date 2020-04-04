const path              = require('path');
const MiniExtractCss    = require('mini-css-extract-plugin');
const HtmlExtractPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: {
        isearch: "./src/main.tsx"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniExtractCss.loader, 'css-loader', 'sass-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts', '.jsx', '.css', '.sass', '.scss']
    },
    plugins: [new MiniExtractCss(), new HtmlExtractPlugin({
        template: './src/template.html'
    })]
}