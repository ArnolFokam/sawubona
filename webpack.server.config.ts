import path from 'path';
import nodeExternals from 'webpack-node-externals';

module.exports = [
    {
        target: 'node',
        mode: 'development',
        entry: './src/server.ts',
        devtool: 'inline-source-map',
        externals: [nodeExternals()],
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
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                "@": path.resolve(__dirname, './src/'),
            },
        },
        output: {
            filename: 'server.js',
            path: path.resolve(__dirname, 'build'),
        },
    },
]