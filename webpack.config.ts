import path from 'path';
import NodemonPlugin from 'nodemon-webpack-plugin';

module.exports = [
    {
        target: 'node',
        mode: 'development',
        entry: './src/server.ts',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', 'jsx', '.js'],
            alias: {
                "@": path.resolve(__dirname, './src/'),
            },
        },
        output: {
            filename: 'server.js',
            path: path.resolve(__dirname, 'build'),
        },
        plugins: [
            new NodemonPlugin({
                script: './build/server.js',
                ext: 'js,njk,json,ts,tsx',
            }),
        ]
    },
    {
        target: 'web',
        mode: 'development',
        entry: './src/client/index.tsx',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', 'jsx', '.js'],
            alias: {
                "@": path.resolve(__dirname, './src/'),
            },
        },
        output: {
            filename: 'client.js',
            path: path.resolve(__dirname, 'build/static'),
        },
    },
]