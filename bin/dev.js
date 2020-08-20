const express = require('express');
const webpack = require('webpack');
const [ webpackClientConfig, webpackServerConfig ] = require('../webpack.config');
const nodemon = require('nodemon');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig)

hmrServer.use(webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,
    noInfo: true,
    watchOptions: {
        ignore: /dist/,
    },
    writeToDisc: true,
    stats: 'errors-only',
}));

hmrServer.use(webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr',
}))

hmrServer.listen(3001, () => {
    console.log('HMR server successfully started')
})

const compiler = webpack(webpackServerConfig);

compiler.run((err) => {
    if (err) {
        console.log('Compilation failed: ', err);
    }

    compiler.watch({}, (err) => {
        if (err) {
            console.log('Compilation failed: ', err);
        }
        console.log('Compilation was successfull');
    });

    nodemon({
        script: path.resolve('dist/server/server.js'),
        watch: [
            path.resolve('dist/server'),
            path.resolve('dist/client'),
        ]
    })
});
