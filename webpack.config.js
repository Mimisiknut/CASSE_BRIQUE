const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const dev = process.env.NODE_ENV === "dev";
const dev = true;

let config = {
    entry: "./src/ts/main.ts",
    watch: dev,
    output: {
        path: path.resolve("./dist"),
        filename: "bundle.js",
        publicPath: '/dist/'
    },

    devtool: dev ? "cheap-module-eval-source-map" : "source-map",

    module: {
        rules: [            
            { 
                test: /\.ts?$/, 
                use: 'ts-loader',
                exclude: /node_modules/ 
            }            
        ]
    },

    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },

    plugins: []
}

if(!dev) {
    config.plugins.push(new uglifyJsPlugin({
        sourceMap: true
    }));
}
module.exports = config;