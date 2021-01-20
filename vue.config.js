const path = require("path");
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    publicPath: "./",
    assetsDir: "static",
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import "${path.resolve(
                        __dirname,
                        './src/theme/vant-change.less'
                    )}";`
                }
            },
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(
                __dirname,
                './src/theme/var.less'
            )]
        }
    }
};