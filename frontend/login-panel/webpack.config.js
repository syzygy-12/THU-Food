const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development', // Change to 'production' for production builds
    entry: './src/renderer.tsx', // Your entry file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        alias: {
            Globals: path.resolve(__dirname, 'src/Globals/'),
            Images: path.resolve(__dirname, 'src/Images/'),
            Pages: path.resolve(__dirname, 'src/Pages/'),
            Plugins: path.resolve(__dirname, 'src/Plugins/'),
            Styles: path.resolve(__dirname, 'src/Styles/'),
            Utils: path.resolve(__dirname, 'src/Utils/'),
        },
        fallback: {
            path: require.resolve('path-browserify'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
        mainFields: ['browser', 'module', 'main']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            __dirname: JSON.stringify('/')
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        historyApiFallback: true // For single page applications
    }
};