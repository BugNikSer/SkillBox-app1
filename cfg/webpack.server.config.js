const path = require('path');
const nodeExternals = require('webpack-node-externals');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    mode: NODE_ENV || 'development',    
    target: 'node',
    entry: path.resolve('src/server/server.js'),
    output: {
        path: path.resolve('dist/server'),
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: ['ts-loader'],
            }
        ]   
    },
    optimization: {
        minimize: false,
    },
}