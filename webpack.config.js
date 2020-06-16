const path = require('path');

module.exports = {
    mode: 'development',
    entry: [
        './src/logic/SquareCollector.ts'
    ],
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
        extensions: [ '.tsx', '.ts' ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'quardratum-library.js',
    }
};