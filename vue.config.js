"use strict";

const path = require("path");

module.exports = {
    devServer: {
        disableHostCheck: true,
        https: true
    },
    publicPath: process.env.DEPLOY_ENV === "PROD" ? "/snaly/" : "/",

    css: {
        loaderOptions: {
            scss: {
                prependData: "@import '@/ui/style/_base.scss';"
            }
        }
    }
};
