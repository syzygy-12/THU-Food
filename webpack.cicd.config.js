const { default: getForgeConfig } = require('@electron-forge/core/dist/util/forge-config');
const { getHookListrTasks } = require('@electron-forge/core/dist/util/hook');
const { getHostArch } = require('@electron/get');
const { Listr } = require('listr2');
const { default: resolveDir } = require('@electron-forge/core/dist/util/resolve-dir');
const { readMutatedPackageJson } = require('@electron-forge/core/dist/util/read-package-json');
const { default: getCurrentOutDir } = require('@electron-forge/core/dist/util/out-dir');
const chalk = require('chalk');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const log = console;
const listrPackage = ({
                          dir: providedDir = process.cwd(),
                          arch = getHostArch(),
                          platform = process.platform,
                          outDir,
                      }) => {
    return new Listr([
        {
            title: 'Preparing to package application',
            task: async ctx => {
                const resolvedDir = await resolveDir(providedDir);
                if (!resolvedDir) {
                    throw new Error('Failed to locate compilable Electron application');
                }
                ctx.dir = resolvedDir;

                ctx.forgeConfig = await getForgeConfig(resolvedDir);
                ctx.packageJSON = await readMutatedPackageJson(resolvedDir, ctx.forgeConfig);

                if (!ctx.packageJSON.main) {
                    throw new Error('packageJSON.main must be set to a valid entry point for your Electron app');
                }

                ctx.calculatedOutDir = outDir || getCurrentOutDir(resolvedDir, ctx.forgeConfig);
            },
        },
        {
            title: 'Running packaging hooks',
            task: async ({ forgeConfig }, task) => {
                return task.newListr([
                    {
                        title: `Running ${chalk.yellow('generateAssets')} hook`,
                        task: async (_, task) => {
                            return task.newListr(await getHookListrTasks(forgeConfig, 'generateAssets', platform, arch));
                        },
                    },
                    {
                        title: `Running ${chalk.yellow('prePackage')} hook`,
                        task: async (_, task) => {
                            return task.newListr(await getHookListrTasks(forgeConfig, 'prePackage', platform, arch));
                        },
                    },
                ]);
            },
        },
    ]);
};

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '.'),
        publicPath: '/THU-Food/'
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
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        fallback: {
            "path": require.resolve("path-browserify"),
            "fs": false,
            "child_process": false,
            "process": require.resolve("process/browser")
        }
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
        historyApiFallback: true // 支持SPA路由
    }
};

async function main() {
    try {
        const runner = listrPackage({});
        await runner.run();
    } catch (e) {
        log.error(e);
        process.exit(-1);
    }
}

main();
